import { base64ToBlob } from "./base642blob.js";

export function bufferToUrl(data) {
  const bytes = new Uint8Array(data.currentTrack.image.imageBuffer.data);
  const binary = bytes.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    "",
  );
  const base64 = btoa(binary);
  const img = `data:${data.currentTrack.image.mime};base64,${base64}`;
  const blob = base64ToBlob(img, data.currentTrack.image.mime);
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}
