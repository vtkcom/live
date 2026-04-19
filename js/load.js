import { getFastColors } from "./color.js";

let currentTrack = null

export async function loadInfo() {
  const res = await fetch("https://radio.laapl.ru/getState");
  const data = await res.json();

  if (currentTrack !== `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`) {
    if (data.currentTrack.image) {
      const bytes = new Uint8Array(data.currentTrack.image.imageBuffer.data);
      const binary = bytes.reduce((data, byte) => data + String.fromCharCode(byte), '');
      const base64 = btoa(binary);
      const img = `data:${data.currentTrack.image.mime};base64,${base64}`;
      const colors = await getFastColors(img, 3);


      document.querySelector('player img').src = img;
      document.documentElement.style.setProperty('--img', `url(${img})`);
      document.documentElement.style.setProperty('--bg-color', colors[0].hex);
      document.documentElement.style.setProperty('--text-color', colors[1].hex);
      document.documentElement.style.setProperty('--secondary-color', colors[2].hex);
    }

    document.querySelector('track-title').textContent = data.currentTrack.title || "Неизвестный трек"
    document.querySelector('track-artist').textContent = data.currentTrack.artist || "Неизвестный испольнитель"
    document.querySelector('track-album').textContent = data.currentTrack.album || "Неизвестный альбом"
    document.querySelector('track-year').textContent = data.currentTrack.year || "Год не указан"

    document.title = `${data.currentTrack.artist} - ${data.currentTrack.title}`

    currentTrack = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`
  }
}