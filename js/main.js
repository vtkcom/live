import { loadInfo } from "./services/load.js";
import { getUrl } from "./utils/getUrl.js";

const audio = new Audio();
const button = document.querySelector("control svg");
const volume = document.querySelector("volume input");

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
});

audio.addEventListener("play", (e) => {
  document.querySelector("control").style.display = "none";
});

loadInfo();

setInterval(loadInfo, 3 * 1000);
