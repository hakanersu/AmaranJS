import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const src = join(import.meta.dirname, '../src/css/amaran.css');
const outDir = join(import.meta.dirname, '../dist/css');

mkdirSync(outDir, { recursive: true });

const css = readFileSync(src, 'utf8');

// Minify: strip comments, collapse whitespace
const minified = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>~+])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

writeFileSync(join(outDir, 'amaran.css'), css);
writeFileSync(join(outDir, 'amaran.min.css'), minified);

console.log('CSS written to dist/css/');
