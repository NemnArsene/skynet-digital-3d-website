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

// Backup or clean up existing frames
const oldFrames = files.filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
console.log(`Found ${oldFrames.length} existing frames. Updating to Ultra-HD (3840x2160 Lanczos + Unsharp Masking q:92)...`);

// Temporary output dir to ensure zero downtime or partial reads
const tempDir = path.join(heroDir, "_temp_frames");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const outputPattern = path.join(tempDir, "hero-frame-%03d.webp");
const cmd = `ffmpeg -y -i "${inputVideo}" -vf "scale=3840:2160:flags=lanczos,unsharp=5:5:0.8:3:3:0.4" -c:v libwebp -lossless 0 -compression_level 1 -q:v 92 -threads 0 "${outputPattern}"`;

console.log("Executing high-fidelity extraction...");
console.time("Extraction completed in");
execSync(cmd, { stdio: "inherit" });
console.timeEnd("Extraction completed in");

// Move new frames into heroDir, replacing old ones
const extractedFrames = fs.readdirSync(tempDir).filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
console.log(`Moving ${extractedFrames.length} new crystal-clear frames into place...`);

for (const file of extractedFrames) {
  const src = path.join(tempDir, file);
  const dest = path.join(heroDir, file);
  fs.copyFileSync(src, dest);
  fs.unlinkSync(src);
}

fs.rmdirSync(tempDir);

const newFrames = fs.readdirSync(heroDir).filter(f => f.startsWith("hero-frame-") && f.endsWith(".webp"));
const totalBytes = newFrames.reduce((acc, f) => acc + fs.statSync(path.join(heroDir, f)).size, 0);
console.log(`Successfully updated! Total frames: ${newFrames.length}`);
console.log(`Total size: ${(totalBytes / (1024 * 1024)).toFixed(1)} MB`);
console.log(`Average frame size: ${(totalBytes / newFrames.length / 1024).toFixed(1)} KB`);
