#!/usr/bin/env node

import bumpkin from './bumpkin.js';

const [, , version = 'patch'] = process.argv;

try {
  const result = bumpkin({ version });
  console.log(`Bumped ${version} version to ${result}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}