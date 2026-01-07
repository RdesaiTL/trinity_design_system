/**
 * CI Script: Validate Documentation Freshness
 * 
 * Ensures RELEASE.md and other key docs are updated when version changes.
 * Run as: node scripts/check-docs-freshness.js
 * 
 * Exit codes:
 *   0 - All docs are fresh
 *   1 - Stale docs detected
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Get version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageJson.version;

console.log(`📋 Checking docs freshness for v${version}...\n`);

let hasErrors = false;

// Check RELEASE.md contains current version
const releasePath = path.join(rootDir, 'docs/RELEASE.md');
if (fs.existsSync(releasePath)) {
  const release = fs.readFileSync(releasePath, 'utf8');
  if (!release.includes(version)) {
    console.error(`❌ ${releasePath} does not reference v${version}`);
    console.error('   → Update the release notes before merging.\n');
    hasErrors = true;
  } else {
    console.log(`✅ ${releasePath} is up to date`);
  }
} else {
  console.error(`❌ ${releasePath} not found`);
  hasErrors = true;
}

// Check package.json version matches git tag (if in CI with tag)
if (process.env.GITHUB_REF_TYPE === 'tag') {
  const tag = process.env.GITHUB_REF_NAME;
  const expectedTag = `v${version}`;
  if (tag !== expectedTag) {
    console.error(`❌ Git tag "${tag}" doesn't match package.json version "${expectedTag}"`);
    hasErrors = true;
  } else {
    console.log(`✅ Git tag matches package.json version`);
  }
}

// Summary
console.log('');
if (hasErrors) {
  console.error('❌ Documentation freshness check FAILED');
  console.error('   Storybook must not show stale release information.\n');
  process.exit(1);
} else {
  console.log('✅ All documentation is fresh\n');
  process.exit(0);
}
