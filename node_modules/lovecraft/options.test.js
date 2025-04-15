import { expect } from 'chai';
import options from './options.js';

describe('options', () => {
  it('sets the test option when no arguments are provided', () => {
    expect(options()).to.deep.equal({ test: true });
  });

  it('sets the test option when -t or --test is provided', () => {
    const expected = { test: true };
    expect(options(['-t'])).to.deep.equal(expected);
    expect(options(['--test'])).to.deep.equal(expected);
  });

  it('sets the lint option when -l or --lint is provided', () => {
    const expected = { lint: true };
    expect(options(['-l'])).to.deep.equal(expected);
    expect(options(['--lint'])).to.deep.equal(expected);
  });

  it('sets the coverage option when -c or --coverage is provided', () => {
    const expected = { coverage: true };
    expect(options(['-c'])).to.deep.equal(expected);
    expect(options(['--coverage'])).to.deep.equal(expected);
  });

  it('sets the publish option when -p or --publish is provided', () => {
    const expected = { publish: true };
    expect(options(['-p'])).to.deep.equal(expected);
    expect(options(['--publish'])).to.deep.equal(expected);
  });

  it('supports a major publish option when -p or --publish is provided', () => {
    const expected = { publish: 'major' };
    expect(options(['-p', 'major'])).to.deep.equal(expected);
    expect(options(['--publish', 'major'])).to.deep.equal(expected);
  });

  it('supports a minor publish option when -p or --publish is provided', () => {
    const expected = { publish: 'minor' };
    expect(options(['-p', 'minor'])).to.deep.equal(expected);
    expect(options(['--publish', 'minor'])).to.deep.equal(expected);
  });

  it('enables all checks when -a or --all is provided', () => {
    const expected = { test: true, lint: true, coverage: true };
    expect(options(['-a'])).to.deep.equal(expected);
    expect(options(['--all'])).to.deep.equal(expected);
  });

  it('sets multiple options when multiplef flags are provided', () => {
    expect(options(['-t', '-p'])).to.deep.equal({ test: true, publish: true });
    expect(options(['-c', '-p'])).to.deep.equal({ coverage: true, publish: true });
    expect(options(['-c', '-l'])).to.deep.equal({ lint: true, coverage: true });
    expect(options(['-t', '-l', '-p'])).to.deep.equal({ test: true, lint: true, publish: true });
  });

  it('sets the full set of options when the full set of flags are provided', () => {
    const expected = { test: true, lint: true, coverage: true, publish: true };
    expect(options(['-t', '-l', '-c', '-p'])).to.deep.equal(expected);
    expect(options(['-a', '-p'])).to.deep.equal(expected);
  });
});