import { getState } from "./services/getState.js";
import { getQueue } from "./services/getQueue.js";
import { getUrl } from "./utils/getUrl.js";

const audio = new Audio();
const volume = document.querySelector("volume input");
const playButton = document.querySelector("control svg");
const reloadButton = document.querySelector("error svg");
let index = null;

audio.addEventListener("error", handleError);

audio.addEventListener("stalled", () => {
  console.log("Загрузка потока остановлена");
});

function reloadStream() {
  audio.src = "";
  audio.load();
  audio.src = getUrl("stream");
  audio.play();
  document.querySelector("error").style.display = "none";
}

function handleError(e) {
  if (audio.error) {
    document.querySelector("error").style.display = null;
  }
}

playButton.addEventListener("click", reloadStream);
reloadButton.addEventListener("click", reloadStream);

volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

audio.addEventListener("pause", (e) => {
  document.querySelector("control").style.display = null;
  document.documentElement.removeAttribute("playing");
});

audio.addEventListener("play", (e) => {
  document.querySelector("control").style.display = "none";
  document.documentElement.setAttribute("playing", "");
});

getQueue(index);

setInterval(() => getQueue(index), 1 * 1000);
