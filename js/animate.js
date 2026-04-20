
export async function outAnimation() {
  return new Promise((res, rej) => {
    const cover = document.querySelector("player");
    const disk = document.querySelector("player div");
    const trackBlock = document.querySelector("track-info");

    trackBlock.style.animation = "outBlock 0.5s";
    cover.style.animation = "outCover 0.5s";
    disk.style.animation = "outDisc 0.5s";

    trackBlock.addEventListener("animationend", res);
  });
}

export async function inAnimation() {
  return new Promise((res, rej) => {
    const cover = document.querySelector("player");
    const disk = document.querySelector("player div");
    const trackBlock = document.querySelector("track-info");

    trackBlock.style.animation = "inBlock  0.5s";
    cover.style.animation = "inCover 0.5s";
    disk.style.animation = "inDisc 0.5s";

    trackBlock.addEventListener("animationend", () => {
      disk.style.animation = "circle 2s infinite linear";
      res();
    });
  });
}