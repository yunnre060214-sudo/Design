import assert from 'node:assert/strict';
import { access, cp, mkdir, rm } from 'node:fs/promises';
import { cases, patterns, notes } from '../catalog.js';
import { mockScreen } from '../screens.js';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
const entries = new Set(cases.map(entry => entry.id));
const patternIds = new Set(patterns.map(pattern => pattern.id));
assert.equal(entries.size, cases.length, 'Case IDs must be unique');
assert.equal(patternIds.size, patterns.length, 'Pattern IDs must be unique');

for (const entry of cases) {
  assert.match(entry.id, /^[a-z]+$/);
  assert(patternIds.has(entry.pattern), `Unknown pattern in ${entry.id}`);
  assert(['mobile', 'web'].includes(entry.platform), `Unknown platform in ${entry.id}`);
  assert(entry.frames.length >= 2, `Missing screens in ${entry.id}`);
  for (const [index, frame] of entry.frames.entries()) {
    assert(frame.label && frame.headline && frame.insight && frame.action && frame.options.length);
    const markup = mockScreen(entry, index);
    const asset = markup.match(/src="\.\/(assets\/[^"]+)"/)?.[1];
    if (asset) await access(new URL(asset, root));
  }
}
for (const note of notes) {
  assert(note.cases.every(id => entries.has(id)), `Unknown related case in ${note.title}`);
}

await rm(output, { recursive: true, force: true });
await mkdir(output);
for (const path of ['index.html', 'styles.css', 'app.js', 'catalog.js', 'screens.js', 'assets', '.nojekyll']) {
  await cp(new URL(path, root), new URL(path, output), { recursive: true });
}
console.log(`Built Formroom with ${cases.length} cases and ${cases.reduce((total, entry) => total + entry.frames.length, 0)} screens.`);
