import { base64ToBlob } from "./base642blob.js";
import { getFastColors } from "./color.js";

let currentTrack = null;
let isLoading = true;

export async function loadInfo() {
  const res = await fetch("https://radio.laapl.ru/getState");
  const data = await res.json();

  if (
    currentTrack !==
    `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`
  ) {
    if (data.currentTrack.image) {
      const bytes = new Uint8Array(data.currentTrack.image.imageBuffer.data);
      const binary = bytes.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      );
      const base64 = btoa(binary);
      const img = `data:${data.currentTrack.image.mime};base64,${base64}`;
      const colors = await getFastColors(img, 4);
      const blob = base64ToBlob(img, data.currentTrack.image.mime);
      const imageUrl = URL.createObjectURL(blob);

      document.documentElement.style.setProperty(
        "--bg-color",
        `rgb(${colors[0].rgb.join(", ")})`,
      );
      document.documentElement.style.setProperty(
        "--bg-two-color",
        `rgb(${colors[1].rgb.join(", ")})`,
      );
      document.documentElement.style.setProperty(
        "--bg-three-color",
        `rgb(${colors[2].rgb.join(", ")})`,
      );
      document.documentElement.style.setProperty(
        "--bg-four-color",
        `rgb(${colors[3].rgb.join(", ")})`,
      );
      await outAnimation();
      document.querySelector("player img").src = imageUrl;
      document.documentElement.style.setProperty("--img", `url(${imageUrl})`);

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: data.currentTrack.title,
          artist: data.currentTrack.artist,
          album: data.currentTrack.album,
          artwork: [
            {
              src: imageUrl,
              type: "image/jpeg",
            },
          ],
        });
      }

      if (isLoading) {
        isLoading = false;
        document.querySelector("loader").style.visibility = "hidden";
      }
    }

    document.querySelector("track-title").textContent =
      data.currentTrack.title || "Неизвестный трек";
    document.querySelector("track-artist").textContent =
      data.currentTrack.artist || "Неизвестный испольнитель";
    document.querySelector("track-album").textContent =
      data.currentTrack.album || "Неизвестный альбом";
    document.querySelector("track-year").textContent =
      data.currentTrack.year || "Год не указан";

    document.title = `${data.currentTrack.artist} - ${data.currentTrack.title}`;

    await inAnimation();

    currentTrack = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`;
  }
}

async function outAnimation() {
  return new Promise((res, rej) => {
    const cover = document.querySelector("player");
    const disk = document.querySelector("player div");
    const trackBlock = document.querySelector("track-info");

    trackBlock.style.animation = "outBlock 0.5s";
    cover.style.animation = "outCover 0.5s";
    disk.style.animation = "outDisc 0.5s";

    trackBlock.addEventListener("animationend", res);
  });
}

async function inAnimation() {
  return new Promise((res, rej) => {
    const cover = document.querySelector("player");
    const disk = document.querySelector("player div");
    const trackBlock = document.querySelector("track-info");

    trackBlock.style.animation = "inBlock  0.5s";
    cover.style.animation = "inCover 0.5s";
    disk.style.animation = "inDisc 0.5s";

    trackBlock.addEventListener("animationend", () => {
      disk.style.animation = "circle 2s infinite linear";
      res();
    });
  });
}
