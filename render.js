import fs from 'fs';
import glob from 'glob';
import marked from 'marked';
import necronomicon from 'necronomicon';
import path from 'path';

const BUILT = 'built';
const PARK = 'park';

const commands = []; // TODO: 'image'

const spellbook = necronomicon({ commands, includes: {
  directives: false,
  promises: true,
  text: true
} });

const sources = glob.globSync(path.join(PARK, '**', '*.md'));