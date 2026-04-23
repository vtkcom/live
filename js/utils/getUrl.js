import { API_URL_BASE } from "../consts.js";

export function getUrl(path) {
  return new URL(path, API_URL_BASE);
}
