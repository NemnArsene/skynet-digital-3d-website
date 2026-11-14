import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const heroDir = path.resolve("public/frames/hero");
const files = fs.readdirSync(heroDir);
const mp4File = files.find(f => f.endsWith(".mp4"));

if (!mp4File) {
  console.error("No mp4 file found in", heroDir);
  process.exit(1);
}

const inputVideo = path.join(heroDir, mp4File);
console.log("Extracting frames from:", inputVideo);

// Clean up any existing hero-frame or test-frame files
for (const file of files) {
  if (file.startsWith("hero-frame-") || file.startsWith("test-")) {
    fs.unlinkSync(path.join(heroDir, file));
  }
}

// Extract all frames
const outputPattern = path.join(heroDir, "hero-frame-%03d.webp");
const cmd = `ffmpeg -y -i "${inputVideo}" -vf "scale=1920:1080" -c:v libwebp -lossless 0 -compression_level 1 -q:v 82 "${outputPattern}"`;

console.log("Executing ffmpeg...");
console.time("Extraction completed in");
execSync(cmd, { stdio: "inherit" });
console.timeEnd("Extraction completed in");

const finalFrames = fs.readdirSync(heroDir).filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
console.log(`Finished! Total frames extracted: ${finalFrames.length}`);

