import { inAnimation, outAnimation } from "./animate.js";
import { base64ToBlob } from "./base642blob.js";
import { updateFastColors } from "./color.js";
import { updateText } from "./text.js";

let currentTrack = null;
let isLoading = true;

export async function loadInfo() {
  const res = await fetch("https://radio.laapl.ru/getState");
  const data = await res.json();
  const title = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`;

  if (currentTrack !== title) {
    if (data.currentTrack.image) {
      const bytes = new Uint8Array(data.currentTrack.image.imageBuffer.data);
      const binary = bytes.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      );
      const base64 = btoa(binary);
      const img = `data:${data.currentTrack.image.mime};base64,${base64}`;
      const blob = base64ToBlob(img, data.currentTrack.image.mime);
      const imageUrl = URL.createObjectURL(blob);

      await updateFastColors(img);
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
              type: data.currentTrack.image.mime,
            },
          ],
        });
      }
    }

    updateText(data);
    await inAnimation();

    if (isLoading) {
      isLoading = false;
      document.querySelector("loader").style.visibility = "hidden";
    }

    currentTrack = title;
  }
}

