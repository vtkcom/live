import { getState } from "./services/getState.js";
import { getQueue } from "./services/getQueue.js";
import { getUrl } from "./utils/getUrl.js";

const audio = new Audio();
const button = document.querySelector("control svg");
const volume = document.querySelector("volume input");
window.index = null;

audio.addEventListener("error", handleError);

audio.addEventListener("stalled", () => {
  console.log("Загрузка потока остановлена");
});

function handleError(e) {
  if (audio.error) {
    console.log(`Код ошибки: ${audio.error.code}`);
    console.log(`Сообщение: ${audio.error.message}`);
  }
}

button.addEventListener("click", () => {
  audio.src = "";
  audio.load();
  audio.src = getUrl("stream");
  audio.play();
});

volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

audio.addEventListener("pause", (e) => {
  document.querySelector("control").style.display = null;
  document.documentElement.removeAttribute('playing')
});

audio.addEventListener("play", (e) => {
  document.querySelector("control").style.display = "none";
  document.documentElement.setAttribute('playing', '')
});

getQueue(window.index);

setInterval(() => getQueue(window.index), 1 * 1000);
