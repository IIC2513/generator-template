const assert = require('yeoman-assert');
const fs = require('fs');
const sinon = require('sinon');
const helpers = require('yeoman-test');
const path = require('path');

describe('@iic2513/template:app', () => {
  const projectName = 'test-project';
  let installStepCalled = false;

  before(() => { sinon.stub(console, 'log').returns(); });
  // eslint-disable-next-line no-console
  after(() => console.log.restore());

  beforeEach(() => { installStepCalled = false; });

  context('when project name is an argument', () => {
    context('when dependencies must be installed after setup', () => {
      it('generates a project', () => helpers.run(__dirname)
        .withArguments(projectName)
        .withOptions({ skipInstall: false })
        .withPrompts({ installDependencies: true })
        .on('ready', (generator) => {
          // eslint-disable-next-line no-param-reassign
          generator.yarnInstall = () => { installStepCalled = true; };
        })
        .then(() => {
          const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
          assert.file(fileList);
        }));

      it('installs dependencies', () => installStepCalled);
    });

    context('when dependencies must not be installed after setup', () => {
      it('generates a project', () => helpers.run(__dirname)
        .withArguments(projectName)
        .withOptions({ skipInstall: false })
        .withPrompts({ installDependencies: false })
        .on('ready', (generator) => {
          // eslint-disable-next-line no-param-reassign
          generator.yarnInstall = () => { installStepCalled = true; };
        })
        .then(() => {
          const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
          assert.file(fileList);
        }));

      it('does not install dependencies', () => !installStepCalled);
    });
  });

  context('when project name is an answer', () => {
    context('when project name is empty', () => {
      it('fails', () => assert.rejects(() => helpers.run(__dirname)
        .withPrompts({ installDependencies: true, projectName: '' })
        .then(() => {
          const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
          assert.file(fileList);
        })));
    });

    context('when project name is not empty', () => {
      context('when dependencies must be installed after setup', () => {
        it('generates a project', () => helpers.run(__dirname)
          .withOptions({ skipInstall: false })
          .withPrompts({ installDependencies: true, projectName })
          .on('ready', (generator) => {
            // eslint-disable-next-line no-param-reassign
            generator.yarnInstall = () => { installStepCalled = true; };
          })
          .then(() => {
            const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
            assert.file(fileList);
          }));

        it('installs dependencies', () => installStepCalled);
      });

      context('when dependencies must not be installed after setup', () => {
        it('generates a project', () => helpers.run(__dirname)
          .withArguments(projectName)
          .withOptions({ skipInstall: false })
          .withPrompts({ installDependencies: true, projectName })
          .on('ready', (generator) => {
            // eslint-disable-next-line no-param-reassign
            generator.yarnInstall = () => { installStepCalled = true; };
          })
          .then(() => {
            const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
            assert.file(fileList);
          }));

        it('does not install dependencies', () => !installStepCalled);
      });
    });
  });
});
