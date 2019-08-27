const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@iic2513/template:migration', () => {
  const migrationName = 'test-migration';

  function readFilesFromMigrationsFolder(runDirectory) {
    const migrationsDirectory = path.join(runDirectory, 'src', 'migrations');
    return fs.readdirSync(migrationsDirectory);
  }

  context('when option --create is present', () => {
    it('creates migration file', async () => {
      const runDirectory = await helpers.run(__dirname)
        .withOptions({ create: true })
        .withArguments([migrationName]);

      const [migrationFilename] = readFilesFromMigrationsFolder(runDirectory);
      assert.file(path.join(runDirectory, 'src', 'migrations', migrationFilename));
      return expect(migrationFilename.includes(`-${migrationName}.js`)).to.be.true;
    });
  });

  context('when option --destroy is present', () => {
    let runDirectory;
    let migrationFilename;

    before(async () => {
      runDirectory = await helpers.run(__dirname)
        .withOptions({ create: true })
        .withArguments([migrationName]);

      [migrationFilename] = readFilesFromMigrationsFolder(runDirectory);
    });

    it('deletes the migration file', async () => {
      await helpers.run(__dirname)
        .inDir(runDirectory)
        .withOptions({ destroy: true })
        .withArguments([migrationName]);

      assert.noFile(path.join(runDirectory, 'src', 'migrations', migrationFilename));
    });
  });

  context('when option --createTable is present', () => {
    context('when model has one attribute', () => {
      const modelName = 'car';
      const modelAttribute = { name: 'model', type: 'string' };
      let runDirectory;
      let migrationFilename;
      let migrationPath;

      before(async () => {
        runDirectory = await helpers.run(__dirname)
          .withOptions({ createTable: true })
          .withArguments([modelName, `${modelAttribute.name}:${modelAttribute.type}`]);

        [migrationFilename] = readFilesFromMigrationsFolder(runDirectory);
        migrationPath = path.join(runDirectory, 'src', 'migrations', migrationFilename);
      });

      it('generates migration file', () => {
        assert.file(migrationPath);
        return expect(migrationFilename.includes(`-create-${modelName}.js`)).to.be.true;
      });

      it('generates migration with model name in plural', () => assert.fileContent(
        migrationPath,
        `queryInterface.createTable('${pluralize(modelName)}', {`,
      ));

      it('generates model with attribute', () => assert.fileContent(
        migrationPath,
        `${modelAttribute.name}: {`,
      ));
    });

    context('when model has more than one attribute', () => {
      const modelName = 'car';
      const modelAttributes = [
        { name: 'model', type: 'string' },
        { name: 'brand', type: 'string' },
      ];
      let runDirectory;
      let migrationFilename;
      let migrationPath;

      before(async () => {
        const attributes = modelAttributes.map(({ name, type }) => `${name}:${type}`).join(',');
        runDirectory = await helpers.run(__dirname)
          .withOptions({ createTable: true })
          .withArguments([modelName, attributes]);

        [migrationFilename] = readFilesFromMigrationsFolder(runDirectory);
        migrationPath = path.join(runDirectory, 'src', 'migrations', migrationFilename);
      });

      it('generates migration file', () => {
        assert.file(migrationPath);
        return expect(migrationFilename.includes(`-create-${modelName}.js`)).to.be.true;
      });

      it('generates migration with model name in plural', () => assert.fileContent(
        migrationPath,
        `queryInterface.createTable('${pluralize(modelName)}', {`,
      ));

      it('generates migration with attributes', () => modelAttributes.every(
        ({ name }) => assert.fileContent(
          migrationPath,
          `${name}: {`,
        ),
      ));
    });
  });

  context('when an invalid option is specified', () => {
    it('shows an error', () => assert.rejects(() => helpers.run(__dirname)
      .withOptions({ noValidOperation: true })));
  });
});
