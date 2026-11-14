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
console.log("Source video:", inputVideo);

// Clean up existing frames
const oldFrames = files.filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
console.log("Removing", oldFrames.length, "old 1080p frames...");
for (const file of oldFrames) {
  fs.unlinkSync(path.join(heroDir, file));
}

// Extract at NATIVE 4K resolution (2560x1440) — no downscale
// Quality 85 for crisp detail on large/retina displays
const outputPattern = path.join(heroDir, "hero-frame-%03d.webp");
const cmd = `ffmpeg -y -i "${inputVideo}" -c:v libwebp -lossless 0 -compression_level 1 -q:v 85 "${outputPattern}"`;

console.log("Extracting 240 frames at native 2560x1440 (4K)...");
console.time("4K extraction");
execSync(cmd, { stdio: "inherit" });
console.timeEnd("4K extraction");

const newFrames = fs.readdirSync(heroDir).filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
const totalBytes = newFrames.reduce((acc, f) => acc + fs.statSync(path.join(heroDir, f)).size, 0);
console.log(`Done! ${newFrames.length} frames, total size: ${(totalBytes / (1024 * 1024)).toFixed(1)} MB`);
console.log("Sample frame size:", (fs.statSync(path.join(heroDir, newFrames[0])).size / 1024).toFixed(1), "KB");

