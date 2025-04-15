import { expect, match, stub } from 'lovecraft';

import fs from 'fs';
import child_process from 'child_process';

import bumpkin from './bumpkin.js';

describe('bumpkin', () => {
  let readFileSync, writeFileSync, execSync;

  beforeEach(() => {
    readFileSync = stub(fs, 'readFileSync').returns(JSON.stringify({version: '1.2.3'}));
    writeFileSync = stub(fs, 'writeFileSync');
    execSync = stub(child_process, 'execSync');
  });

  afterEach(() => {
    readFileSync.restore();
    writeFileSync.restore();
    execSync.restore();
  });

  it('should bump the patch version by default', () => {
    const newVersion = bumpkin();
    expect(newVersion).to.equal('1.2.4');
    expect(writeFileSync.calledWith(match(/package\.json/), match('1.2.4'))).to.be.true;
    expect(execSync.callCount).to.equal(5);
  });

  it('should bump the patch version', () => {
    const newVersion = bumpkin.patch();
    expect(newVersion).to.equal('1.2.4');
    expect(writeFileSync.calledWith(match(/package\.json/), match('1.2.4'))).to.be.true;
    expect(execSync.callCount).to.equal(5);
  });

  it('should bump the minor version', () => {
    const newVersion = bumpkin.minor();
    expect(newVersion).to.equal('1.3.0');
    expect(writeFileSync.calledWith(match(/package\.json/), match('1.3.0'))).to.be.true;
    expect(execSync.callCount).to.equal(5);
  });

  it('should bump the major version', () => {
    const newVersion = bumpkin.major();
    expect(newVersion).to.equal('2.0.0');
    expect(writeFileSync.calledWith(match(/package\.json/), match('2.0.0'))).to.be.true;
    expect(execSync.callCount).to.equal(5);
  });

  it('throws errors with unknown version fields', () => {
    try {
      bumpkin({ version: 'florp' });
      expect.fail();
    } catch (error) {
      expect(error.message).to.include('florp');
    }
  });
});
