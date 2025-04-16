import fs from 'fs';
import * as glob from 'glob';
import { marked } from 'marked';
import metamagic from 'metamagic';
import necronomicon from 'necronomicon';
import path from 'path';
import phantasia from 'phantasia';

const BUILT = 'built';
const PARK = 'park';

const TEMPLATE = body => `<html>
<head>
<title>Nihiland</title>
</head>
<body>
${body}
</body>
</html>`


const commands = [metamagic(
  'image',
  async ({ file }, prompt) => {
    const output = path.join(BUILT, file);
    if (!fs.existsSync(output)) {
      await phantasia(prompt, { output });
    }
    return `![${prompt}](${file})\n`;
  },
  {
    attributes: {
      file: {
        description: 'The name of the PNG file to write.'
      }
    },
    body: {
      description: 'A prompt describing the image, to be used for image generation.'
    }
  }
)];

const spellbook = necronomicon({ commands, includes: {
  directives: false,
  promises: true,
  text: true
} });

const sources = glob.globSync(path.join(PARK, '**', '*.md'));

for (const source of sources) {
  const text = fs.readFileSync(source, 'utf-8');
  const executed = await spellbook.execute(text);
  const parsed = marked.parse(executed);
  const templated = TEMPLATE(parsed);
  const destination = source.replace(PARK, BUILT).replace(/\.md$/, '.html');
  fs.writeFileSync(destination, templated, 'utf-8');
}
