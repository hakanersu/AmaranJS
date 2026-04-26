import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = join(import.meta.dirname, '../examples');

// These examples use animate.css — keep that link pointing locally
const animateCssExamples = new Set(['033', '034', '035', '036', '037']);

const files = readdirSync(dir).filter(f => f.endsWith('.html')).sort();

for (const file of files) {
  const path = join(dir, file);
  const original = readFileSync(path, 'utf8');
  const updated = transform(file, original);
  writeFileSync(path, updated);
  console.log(`  updated: ${file}`);
}

function transform(filename: string, html: string): string {
  const prefix = filename.slice(0, 3);
  const keepAnimateCss = animateCssExamples.has(prefix);

  // ── CSS: amaran stylesheet ──────────────────────────────────
  html = html.replace(
    /href="https?:\/\/[^"]*\/dist\/css\/amaran\.min\.css"/g,
    'href="../dist/css/amaran.css"',
  );
  html = html.replace(
    /href="\.\.\/dist\/css\/amaran\.min\.css"/g,
    'href="../dist/css/amaran.css"',
  );

  // ── CSS: animate.min.css ────────────────────────────────────
  if (keepAnimateCss) {
    html = html.replace(
      /href="https?:\/\/[^"]*\/dist\/css\/animate\.min\.css"/g,
      'href="../dist/css/animate.min.css"',
    );
  } else {
    html = html.replace(/[ \t]*<link rel="stylesheet" href="[^"]*animate\.min\.css">\n?/g, '');
  }

  // ── Scripts: remove jQuery CDN ──────────────────────────────
  html = html.replace(
    /[ \t]*<script src="https?:\/\/ajax\.googleapis\.com\/ajax\/libs\/jquery\/[^"]+"><\/script>\n?/g,
    '',
  );

  // ── Scripts: remove jQuery fallback ────────────────────────
  html = html.replace(
    /[ \t]*<script>window\.jQuery \|\| document\.write\('[^']+'\)<\/script>\n?/g,
    '',
  );

  // ── Scripts: plugin src → local IIFE build ──────────────────
  html = html.replace(
    /src="https?:\/\/[^"]*\/dist\/js\/jquery\.amaran(?:\.min)?\.js"/g,
    'src="../dist/js/amaran.iife.min.js"',
  );
  html = html.replace(
    /src="\.\.\/dist\/js\/jquery\.amaran(?:\.min)?\.js"/g,
    'src="../dist/js/amaran.iife.min.js"',
  );

  // ── JS: $(function(){  →  DOMContentLoaded ─────────────────
  html = html.replace(
    /\$\(function\(\)\s*\{/g,
    "document.addEventListener('DOMContentLoaded', function() {",
  );

  // ── JS: $('#start').on('click', fn)  →  addEventListener ───
  html = html.replace(
    /\$\('#start'\)\.on\(['"]click['"],\s*function\(\)\s*\{/g,
    "document.getElementById('start').addEventListener('click', function() {",
  );

  // ── JS: $.amaran({ / $.amaran.close() ──────────────────────
  html = html.replace(/\$\.amaran\(\{/g, 'amaran({');
  html = html.replace(/\$\.amaran\.close\(\)/g, 'amaran.close()');

  // ── Collapse 3+ blank lines left by removals ───────────────
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}
