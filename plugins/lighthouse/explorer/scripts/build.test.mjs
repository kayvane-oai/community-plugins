import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('cold Explorer package retains full third-party license notices', async () => {
  const notices = await readFile(new URL('../dist/THIRD_PARTY_NOTICES.md', import.meta.url), 'utf8');
  for (const dependency of ['@modelcontextprotocol/sdk', '@modelcontextprotocol/ext-apps', 'smol-toml', 'zod']) {
    assert.ok(notices.includes(`## ${dependency} `), `Missing bundled dependency: ${dependency}`);
  }
  assert.match(notices, /Permission is hereby granted, free of charge/);
  assert.match(notices, /Copyright/i);
  assert.match(notices, /THE SOFTWARE IS PROVIDED "AS IS"/);
  assert.doesNotMatch(notices, /\/Users\/|internal\.api\.openai\.org/);
});
