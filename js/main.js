import { loadInfo } from "./load.js";

const button = document.querySelector("control-button");
const audio = document.querySelector("audio");
const volume = document.querySelector("volume input");

button.addEventListener("click", () => {
  audio.src = "";
  audio.src = "https://radio.laapl.ru/stream";
  audio.play();
});

volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

audio.addEventListener("pause", (e) => {
  document.querySelector("control").style.display = null;
});

audio.addEventListener("play", (e) => {
  document.querySelector("control").style.display = "none";
});

loadInfo();

setInterval(loadInfo, 3 * 1000);
