export function updateText(data) {
  document.querySelector("track-title").textContent =
    data.currentTrack.title || "Неизвестный трек";
  document.querySelector("track-artist").textContent =
    data.currentTrack.artist || "Неизвестный испольнитель";
  document.querySelector("track-album").textContent =
    data.currentTrack.album || "Неизвестный альбом";
  document.querySelector("track-year").textContent =
    data.currentTrack.year || "Год не указан";

  document.title = `${data.currentTrack.artist} - ${data.currentTrack.title}`;
}
