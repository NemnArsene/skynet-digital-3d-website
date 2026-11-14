import fs from "fs";
import path from "path";

export function getHeroFrames(): string[] {
  const framesDir = path.join(process.cwd(), "public", "frames", "hero");

  if (!fs.existsSync(framesDir)) {
    return ["/frames/hero/hero-frame-001.webp"];
  }

  try {
    const files = fs.readdirSync(framesDir);
    const validExtensions = new Set([".webp", ".png", ".jpg", ".jpeg"]);

    // Natural sort: hero-frame-001, hero-frame-002, etc.
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    const frameFiles = files
      .filter((file) => validExtensions.has(path.extname(file).toLowerCase()))
      .sort((a, b) => collator.compare(a, b));

    if (frameFiles.length === 0) {
      return ["/frames/hero/hero-frame-001.webp"];
    }

    return frameFiles.map((file) => `/frames/hero/${file}`);
  } catch (error) {
    console.error("Error reading hero frames directory:", error);
    return ["/frames/hero/hero-frame-001.webp"];
  }
}

