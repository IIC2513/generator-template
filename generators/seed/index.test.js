const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@iic2513/template:seed', () => {
  const seedName = 'test-seed';

  function readFilesFromSeedsFolder(runDirectory) {
    const seedsDirectory = path.join(runDirectory, 'src', 'seeds');
    return fs.readdirSync(seedsDirectory);
  }

  context('when option --create is present', () => {
    it('creates seed file', async () => {
      const runDirectory = await helpers.run(__dirname)
        .withOptions({ create: true })
        .withArguments([seedName]);

      const [seedFilename] = readFilesFromSeedsFolder(runDirectory);
      assert.file(path.join(runDirectory, 'src', 'seeds', seedFilename));
      return expect(seedFilename.includes(`-${seedName}.js`)).to.be.true;
    });
  });

  context('when option --destroy is present', () => {
    let runDirectory;
    let seedFilename;

    before(async () => {
      runDirectory = await helpers.run(__dirname)
        .withOptions({ create: true })
        .withArguments([seedName]);

      [seedFilename] = readFilesFromSeedsFolder(runDirectory);
    });

    it('deletes the seed file', async () => {
      await helpers.run(__dirname)
        .inDir(runDirectory)
        .withOptions({ destroy: true })
        .withArguments([seedName]);

      return assert.noFile(path.join(runDirectory, 'src', 'seeds', seedFilename));
    });
  });

  context('when an invalid option is specified', () => {
    it('shows an error', () => assert.rejects(() => helpers.run(__dirname)
      .withOptions({ noValidOperation: true })));
  });
});
