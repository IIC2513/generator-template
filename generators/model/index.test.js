const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@iic2513/template:model', () => {
  context('when option --create is present', () => {
    context('when model has one attribute', () => {
      const modelName = 'car';
      const modelAttribute = { name: 'model', type: 'string' };
      let runDirectory;

      before(async () => {
        runDirectory = await helpers.run(__dirname)
          .withOptions({ create: true })
          .withArguments([modelName, `${modelAttribute.name}:${modelAttribute.type}`]);
      });

      it('generates model file', () => assert.file(path.join(runDirectory, 'src', 'models', `${modelName}.js`)));

      it('generates model with model name', () => assert.fileContent(
        path.join(runDirectory, 'src', 'models', `${modelName}.js`),
        `return ${modelName};`,
      ));

      it('generates model with attribute', () => assert.fileContent(
        path.join(runDirectory, 'src', 'models', `${modelName}.js`),
        `${modelAttribute.name}: DataTypes.${modelAttribute.type.toUpperCase()},`,
      ));
    });

    context('when model has more than one attribute', () => {
      const modelName = 'car';
      const modelAttributes = [
        { name: 'model', type: 'string' },
        { name: 'brand', type: 'string' },
      ];
      let runDirectory;

      before(async () => {
        const attributes = modelAttributes.map(({ name, type }) => `${name}:${type}`).join(',');
        runDirectory = await helpers.run(__dirname)
          .withOptions({ create: true })
          .withArguments([modelName, attributes]);
      });

      it('generates model file', () => assert.file(path.join(runDirectory, 'src', 'models', `${modelName}.js`)));

      it('generates model with model name', () => assert.fileContent(
        path.join(runDirectory, 'src', 'models', `${modelName}.js`),
        `return ${modelName};`,
      ));

      it('generates model with attributes', () => modelAttributes.every(
        ({ name, type }) => assert.fileContent(
          path.join(runDirectory, 'src', 'models', `${modelName}.js`),
          `${name}: DataTypes.${type.toUpperCase()},`,
        ),
      ));
    });
  });

  context('when option --destroy is present', () => {
    const modelName = 'car';
    let runDirectory;

    before(async () => {
      runDirectory = await helpers.run(__dirname)
        .withOptions({ create: true })
        .withArguments([modelName, 'brand:string']);
    });

    it('deletes the model file', async () => {
      await helpers.run(__dirname)
        .inDir(runDirectory)
        .withOptions({ destroy: true })
        .withArguments([modelName]);

      return assert.noFile(path.join(runDirectory, 'src', 'models', `${modelName}.js`));
    });
  });

  context('when an invalid option is specified', () => {
    it('shows an error', () => assert.rejects(() => helpers.run(__dirname)
      .withOptions({ noValidOperation: true })));
  });
});
