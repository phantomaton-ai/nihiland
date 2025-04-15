import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const versions = { 'major': 0, 'minor': 1, 'patch': 2 };

function bumpkin(options = { version: 'patch' }) {
  if (!Object.hasOwn(versions, options.version)) {
    throw new Error([
      `Unknown version field ${options.version}.`,
      'Valid options are:',
      Object.keys(versions).join(', ')
    ].join(' '));
  }

  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const depth = versions[options.version];
  packageJson.version = packageJson.version.split('.').map(
    (value, index) =>
      index === depth ? parseInt(value) + 1 : 
      index > depth ? 0 :
      value
  ).join('.');

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  [
    'git add package.json && git commit -m "bump!"',
    `git tag v${packageJson.version}`,
    'git push',
    'git push --tags',
    'npm publish'
  ].forEach(command => child_process.execSync(command, { cwd }));

  return packageJson.version;
}

Object.keys(versions).forEach(version => {
  bumpkin[version] = (options = {}) => bumpkin({ ...options, version });
});

export default bumpkin;