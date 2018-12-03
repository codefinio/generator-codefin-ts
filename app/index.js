
const file = require('file')
const path = require('path')
const Generator = require('yeoman-generator')
const yosay = require('yosay')
const chalk = require('chalk')
const jsesc = require('jsesc')
const mkdirp = require('mkdirp')

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

class TypescriptProjectGenerator extends Generator {
  initializing(name) {
    this.name = name
    this.dirname = path.basename(this.destinationRoot());
    this.dirnameNoJs = path.basename(this.dirname, '.js');
    this.dirnameWithJs = this.dirnameNoJs + '.js';
  }
  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.magenta('Codefin\'s Typescript NodeJS') + ' generator!'
    ))
    const defaultProjectName = this.name || this.dirname
    const gitName = this.user.git.name();
    const gitEmail = this.user.git.email();
    let defaultAuthor = gitName ? gitName : '';
    if (gitEmail) {
      defaultAuthor += ` <${gitEmail}>`;
    }

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the repository/project name?',
      default: defaultProjectName,
    },{
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?'
    },{
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: defaultAuthor,
    }]

    return this.prompt(prompts)
      .then((props) => {
        this.props = props
      })
  }
  write() {
    const src = this.sourceRoot()
    const target = this.name || '.'
    mkdirp.sync(target + '/src')
    mkdirp.sync(target + '/tests/units')
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath(target + '/.gitignore')
    )

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(target + '/package.json'),
      { 
        name: this.props.name,
        author: this.props.author,
        description: this.props.description
      }
    )

    this.fs.copyTpl(
      this.templatePath('nycrc'),
      this.destinationPath(target + '/.nycrc')
    )

    this.fs.copyTpl(
      this.templatePath('tslint.json'),
      this.destinationPath(target + '/tslint.json')
    )

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath(target + '/tsconfig.json')
    )

    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath(target + '/Dockerfile')
    )
  }
}

module.exports = TypescriptProjectGenerator