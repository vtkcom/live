import { getUrl } from "../utils/getUrl.js";
import { getState } from "./getState.js";

export async function getQueue() {
  const res = await fetch(getUrl("getQueue"));
  const data = await res.json();

  if (data.index !== window.index) {
    window.index = data.index;

    getState()
  }
}
