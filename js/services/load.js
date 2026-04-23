import { inAnimation, outAnimation } from "../animate.js";
import { updateFastColors } from "../utils/color.js";
import { updateMediaSession } from "../utils/updateMediaSession.js";
import { updateText } from "../utils/updateText.js";
import { getUrl } from "../utils/getUrl.js";
import { updateImage } from "../utils/updateImage.js";
import { getImageUrl } from "../utils/getImageUrl.js";

let currentTrack = null;
let isLoading = true;

export async function loadInfo() {
  const res = await fetch(getUrl("getState"));
  const data = await res.json();
  const title = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`;

  if (currentTrack !== title) {
    const imageUrl = getImageUrl(data);

    await outAnimation();
    await updateFastColors(imageUrl);
    updateImage(imageUrl);
    updateMediaSession(data, imageUrl, data.currentTrack.image?.mime);
    updateText(data);
    await inAnimation();

    if (isLoading) {
      isLoading = false;
      document.querySelector("loader").style.visibility = "hidden";
    }

    currentTrack = title;
  }
}
