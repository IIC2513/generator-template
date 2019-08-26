const path = require('path');
const Generator = require('yeoman-generator');
const { INITIAL_MESSAGE, FINAL_MESSAGE } = require('../../lib/messages');
const { empty } = require('../../helpers/validation');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('projectName', {
      desc: 'Project name',
      required: false,
      type: String,
    });
  }

  async prompting() {
    // eslint-disable-next-line no-console
    console.log(INITIAL_MESSAGE);

    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name? (eg. my-project)',
        validate: empty,
        when: () => !this.options.projectName,
      },
      {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Would you like install dependencies after setup?',
      },
    ]);
  }

  configuring() {
    this.projectName = this.options.projectName || this.answers.projectName;
    this.destinationRoot(path.join(this.destinationPath(), this.projectName));
    this.config.set('projectName', this.options.projectName);
  }

  writing() {
    // Copy all files
    this.fs.copy(
      this.templatePath(),
      this.destinationPath(),
      { globOptions: { dot: true } },
    );

    this.fs.extendJSON(this.destinationPath('package.json'), { name: this.projectName });
  }

  install() {
    if (this.answers.installDependencies) {
      this.yarnInstall();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  end() {
    // eslint-disable-next-line no-console
    console.log(FINAL_MESSAGE);
  }
};
