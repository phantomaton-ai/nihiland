#!/usr/bin/env node

import lovecraft from './lovecraft.js';
import options from './options.js';

const [, , ...args] = process.argv;

try {
  lovecraft(options(args));
} catch (e) {
  process.exit(e.code);
}
