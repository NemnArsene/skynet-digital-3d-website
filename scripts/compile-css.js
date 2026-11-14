const fs = require('fs');
const path = require('path');
const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');

async function buildCSS() {
  const globalsInput = fs.readFileSync(path.join(__dirname, '../app/globals.css'), 'utf8');

  const res = await compile(globalsInput, {
    from: path.join(__dirname, '../app/globals.css'),
    base: path.join(__dirname, '..'),
    shouldRewriteUrls: true,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      { base: path.join(__dirname, '../app'), pattern: '**/*.{ts,tsx,js,jsx}', negated: false }
    ]
  });

  const candidates = scanner.scan();
  console.log(`[compile-css] Found ${candidates.length} candidates in app/`);

  const css = res.build(candidates);
  const outPath = path.join(__dirname, '../app/tailwind-compiled.css');
  fs.writeFileSync(outPath, css);
  console.log(`[compile-css] Successfully wrote ${css.length} bytes to app/tailwind-compiled.css`);
}

buildCSS().catch(err => {
  console.error('[compile-css] Error:', err);
  process.exit(1);
});

