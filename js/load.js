import { inAnimation, outAnimation } from "./animate.js";
import { bufferToUrl } from "./buffer2url.js";
import { updateFastColors } from "./color.js";
import { updateMediaSession } from "./mediasession.js";
import { updateText } from "./text.js";

let currentTrack = null;
let isLoading = true;

export async function loadInfo() {
  const res = await fetch("https://radio.laapl.ru/getState");
  const data = await res.json();
  const title = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`;

  if (currentTrack !== title) {
    if (data.currentTrack.image) {
      const imageUrl = bufferToUrl(data);

      await updateFastColors(imageUrl);
      await outAnimation();

      document.querySelector("player img").src = imageUrl;
      document.documentElement.style.setProperty("--img", `url(${imageUrl})`);

      updateMediaSession(data, imageUrl);
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
