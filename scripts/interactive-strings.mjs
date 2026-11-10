// Interactive Prototype edition: the inner pages' digests (src/lib/interactive/content/pages.json) against their
// sources. A page taken from the frozen Figma edition may only carry strings of its Figma page, each whole and
// exact, so that nothing is reworded on the way and the Figma Spanish can be reused for it later. The seven pages
// the prototype's author wrote are free text; only their button is held to the Figma page.
// See docs/interactive-prototype.md, "Inner pages".
import fs from 'node:fs/promises';
import path from 'node:path';

const pages = JSON.parse(await fs.readFile('src/lib/interactive/content/pages.json', 'utf8'));
const figma = JSON.parse(await fs.readFile('src/lib/site-data.json', 'utf8'));
// Links that open the prototype's own outline: the frames have no page for them.
const outlines = new Set(['when']);
const tabs = new Set(['stay', 'exp', 'table', 'ask']);
const problems = [];

const cache = new Map();
async function strings(index) {
  if (!cache.has(index)) {
    const source = await fs.readFile(`src/lib/pages/P${String(index).padStart(2, '0')}.svelte`, 'utf8');
    const found = [...source.matchAll(/tr\(locale,\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\)/g)]
      .map(match => JSON.parse(match[1].startsWith("'") ? '"' + match[1].slice(1, -1).replace(/"/g, '\\"') + '"' : match[1]));
    cache.set(index, new Set(found));
  }
  return cache.get(index);
}

let checked = 0;
for (const [key, page] of Object.entries(pages)) {
  const say = text => problems.push(`${key}: ${text}`);
  if (!page.title) say('no title');
  if (!Array.isArray(page.lede) || !page.lede.length || page.lede.some(text => !text)) say('no paragraph');
  if (!Array.isArray(page.facts) || page.facts.length < 3 || page.facts.length > 4 || page.facts.some(fact => fact.length !== 2 || !fact[0] || !fact[1])) say('expected three or four facts, each a label and a value');
  if (!page.cta?.label) say('no button');
  else if (page.cta.page ? !pages[page.cta.page] : !tabs.has(page.cta.book)) say(`the button leads nowhere (${page.cta.page || page.cta.book})`);
  if (page.focus != null && !(page.focus >= 0 && page.focus <= 100)) say(`focus ${page.focus} is not a percentage`);
  try { await fs.access(path.join('public/interactive/img', page.photo || '')); } catch { say(`missing photograph ${page.photo}`); }

  const source = page.from === 'prototype' ? page.figma : page.from;
  const meta = figma.find(item => item.index === source);
  if (!meta) { say(`no Figma page ${source}`); continue; }
  const known = await strings(source);
  const held = page.from === 'prototype' ? [page.cta?.label] : [...page.lede, ...page.facts.flat(), page.cta?.label];
  if (page.from !== 'prototype' && page.title !== meta.name) say(`title "${page.title}" is not the Figma page's name "${meta.name}"`);
  for (const text of held) {
    checked += 1;
    if (!known.has(text)) say(`not a string of Figma page ${source} (${meta.name}): "${String(text).slice(0, 70)}"`);
  }
}

// Every link to an inner page must have one.
async function* files(dir) {
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else if (entry.name.endsWith('.svelte')) yield full;
  }
}
const linked = new Set();
for await (const file of files('src/lib/interactive')) {
  for (const [, key] of (await fs.readFile(file, 'utf8')).matchAll(/data-p="([\w-]+)"/g)) {
    linked.add(key);
    if (!pages[key] && !outlines.has(key)) problems.push(`${path.relative('src/lib/interactive', file)}: a link to "${key}", which has no page`);
  }
}
for (const key of Object.keys(pages)) if (!linked.has(key) && !Object.values(pages).some(page => page.cta?.page === key)) problems.push(`${key}: nothing links to this page`);

if (problems.length) {
  console.error('Interactive Prototype inner pages:\n  ' + problems.join('\n  '));
  process.exitCode = 1;
} else {
  const fromFigma = Object.values(pages).filter(page => page.from !== 'prototype').length;
  console.log(`Interactive Prototype: ${Object.keys(pages).length} inner pages (${fromFigma} from the Figma edition, ${checked} strings exact), ${linked.size} links resolve`);
}
