import { loadInfo } from "./load.js";

const button = document.querySelector('button');
const audio = document.querySelector('audio');

button.addEventListener("click", () => {
  audio.play();
  document.querySelector('control').style.display = "none";
});

loadInfo()

setInterval(loadInfo, 3 * 1000)