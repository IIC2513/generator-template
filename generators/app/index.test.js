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
      context('when installDependencies answer is Yes', () => {
        it('generates a project', () => helpers.run(__dirname)
          .withArguments(projectName)
          .withPrompts({ installDependencies: true })
          .then((directory) => {
            installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
            const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
            assert.file(fileList);
          }))
          .timeout(5000);

        it('installs dependencies', () => installStepCalled);
      });

      context('when installDependencies option is present', () => {
        it('generates a project', () => helpers.run(__dirname)
          .withArguments(projectName)
          .withOptions({ installDependencies: true })
          .then((directory) => {
            installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
            const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
            assert.file(fileList);
          }))
          .timeout(5000);

        it('installs dependencies', () => installStepCalled);
      });
    });

    context('when dependencies must not be installed after setup', () => {
      it('generates a project', () => helpers.run(__dirname)
        .withArguments(projectName)
        .withPrompts({ installDependencies: false })
        .then((directory) => {
          installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
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
        context('when installDependencies answer is Yes', () => {
          it('generates a project', () => helpers.run(__dirname)
            .withPrompts({ installDependencies: true, projectName })
            .then((directory) => {
              installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
              const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
              assert.file(fileList);
            }))
            .timeout(5000);

          it('installs dependencies', () => installStepCalled);
        });

        context('when installDependencies option is present', () => {
          it('generates a project', () => helpers.run(__dirname)
            .withOptions({ installDependencies: true })
            .withPrompts({ projectName })
            .then((directory) => {
              installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
              const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
              assert.file(fileList);
            }))
            .timeout(5000);

          it('installs dependencies', () => installStepCalled);
        });
      });

      context('when dependencies must not be installed after setup', () => {
        it('generates a project', () => helpers.run(__dirname)
          .withArguments(projectName)
          .withPrompts({ installDependencies: true, projectName })
          .then((directory) => {
            installStepCalled = fs.existsSync(path.join(directory, 'node_modules'));
            const fileList = fs.readdirSync(path.join(__dirname, 'templates'));
            assert.file(fileList);
          }));

        it('does not install dependencies', () => !installStepCalled);
      });
    });
  });
});
