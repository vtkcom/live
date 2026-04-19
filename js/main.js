import { loadInfo } from "./load.js";

const button = document.querySelector('control-button');
const audio = document.querySelector('audio');
const volume = document.querySelector('volume input');

button.addEventListener("click", () => {
  audio.play();
  document.querySelector('control').style.display = "none";
});

volume.addEventListener('input', (e) => {
  audio.volume = e.target.value / 100;
})

loadInfo()

setInterval(loadInfo, 3 * 1000)