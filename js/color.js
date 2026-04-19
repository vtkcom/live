export async function getFastColors(imageUrl, colorCount = 5) {
  const img = new Image();
  img.crossOrigin = "Anonymous";

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Уменьшаем размер для скорости
      const size = 100;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);

      const colorMap = new Map();

      // Сэмплируем каждый 4-й пиксель для скорости
      for (let i = 0; i < imageData.data.length; i += 16) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        if (r + g + b > 30) {
          // игнорируем почти черные
          const key = `${Math.round(r / 10) * 10},${Math.round(g / 10) * 10},${Math.round(b / 10) * 10}`;
          colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
      }

      const sorted = [...colorMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([color, count]) => ({
          rgb: color.split(",").map(Number),
          hex:
            "#" +
            color
              .split(",")
              .map((c) => parseInt(c).toString(16).padStart(2, "0"))
              .join(""),
        }));

      resolve(sorted);
    };

    img.src = imageUrl;
  });
}
