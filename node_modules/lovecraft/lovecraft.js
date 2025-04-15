import child_process from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import bumpkin from 'bumpkin';

import options from './options.js';

const FILE = fileURLToPath(import.meta.url);
const DIR = path.dirname(FILE);
const BIN = path.join('node_modules', '.bin');
const ESLINT = `${path.join(BIN, 'eslint')} -c ${path.join(DIR, 'eslint.config.js')} --ignore-pattern 'coverage/**/*'`;
const MOCHA = `${path.join(BIN, 'mocha')} --ignore 'node_modules/**/*' **/*.test.js`;
const C8 = `${path.join(BIN, 'c8')} -x '*.test.*' -r html --check-coverage --lines 100 ${MOCHA}`;
const BUMPKIN = `${path.join(BIN, 'bumpkin')}`;
const BUMPKINS = { major: `${BUMPKIN} major`, minor: `${BUMPKIN} minor` };

const execute = command => child_process.execSync(command, { stdio: 'inherit' });

const lovecraft = ({ test, lint, coverage, publish } = options()) => {
  if (test && !coverage) execute(MOCHA);
  if (coverage) execute(C8);
  if (lint) execute(ESLINT);
  if (publish) execute(BUMPKINS[publish] || BUMPKIN);
};

export default lovecraft;