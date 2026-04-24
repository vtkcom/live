import { circle, inAnimation, outAnimation } from "../animate.js";
import { updateFastColors } from "../utils/color.js";
import { updateMediaSession } from "../utils/updateMediaSession.js";
import { updateText } from "../utils/updateText.js";
import { getUrl } from "../utils/getUrl.js";
import { updateImage } from "../utils/updateImage.js";
import { getImageUrl } from "../utils/getImageUrl.js";

let isLoading = true;

export async function getState() {
  const res = await fetch(getUrl("getState"));
  const data = await res.json();
  const title = `${data.currentTrack.artist} - ${data.currentTrack.title} - ${data.currentTrack.year}`;
  const isPlaying = document.documentElement.getAttribute("playing") === "";

  const imageUrl = getImageUrl(data);

  isPlaying && (await outAnimation());
  await updateFastColors(imageUrl);
  updateImage(imageUrl);
  updateMediaSession(data, imageUrl, data.currentTrack.image?.mime);
  updateText(data);
  isPlaying && (await inAnimation());
  circle();

  if (isLoading) {
    isLoading = false;
    document.querySelector("loader").style.visibility = "hidden";
  }
}
