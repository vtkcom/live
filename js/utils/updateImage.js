export function updateImage(imageUrl) {
    document.querySelector("player img").src = imageUrl;
    document.documentElement.style.setProperty("--img", `url(${imageUrl})`);
}