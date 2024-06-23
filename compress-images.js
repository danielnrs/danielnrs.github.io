const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "src/public/images/heros/compressed");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target).forEach((image) => {
  const inputPath = path.resolve(target, image);
  const filename = image.split(".").slice(0, -1).join(".");
  const largeOutputPath = path.resolve(destination, `${filename}-large.jpg`);
  const smallOutputPath = path.resolve(destination, `${filename}-small.jpg`);

  sharp(inputPath)
    .resize({ width: 800 })
    .jpeg({ quality: 80 }) // Adjust quality as needed
    .toFile(largeOutputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${info.path} compressed successfully`);
      }
    });

  sharp(inputPath)
    .resize({ width: 480 })
    .jpeg({ quality: 80 }) // Adjust quality as needed
    .toFile(smallOutputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${info.path} compressed successfully`);
      }
    });
});
