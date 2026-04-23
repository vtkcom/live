import { bufferToUrl } from "../utils/buffer2url.js";

export function getImageUrl(data) {
  return data.currentTrack.image ? bufferToUrl(data) : "/img/cover.png";
}
