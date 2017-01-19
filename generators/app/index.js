'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pretty ' + chalk.red('S3 deployment') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'artifacts_bucket_development',
        message: 'The Amazon S3 development bucket:'
      },
      {
        type: 'input',
        name: 'artifacts_bucket_production',
        message: 'The Amazon S3 production bucket:'
      },
      {
        type: 'input',
        name: 'artifacts_key',
        message: 'The Amazon AWS Access Key:'
      },
      {
        type: 'input',
        name: 'artifacts_secret',
        message: 'The Amazon AWS Secret Access Key:'
      },
      {
        type: 'input',
        name: 'region',
        message: 'The AWS region:',
        default: 'eu-west-1'
      },
      {
        type: 'input',
        name: 'build_directory',
        message: 'The build directory (this is the webroot). Leave empty to deploy the entire directory.',
        default: ''
      },

      {
        type: 'input',
        name: 'development_branch',
        message: 'The git development branch you would like Travis CI to deploy from:',
        default: 'develop'
      },
      {
        type: 'input',
        name: 'production_branch',
        message: 'The production branch you would like Travis CI to deploy from:',
        default: 'master'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.project;
      this.props = props;
    }.bind(this));
  },

  configuring: function () {
    this.log(yosay('Gotcha! Generating template files.'));
  },

  writing: function () {
    var params = {
      artifacts_bucket_development: this.props.artifacts_bucket_development,
      artifacts_bucket_production: this.props.artifacts_bucket_production,
      development_branch: this.props.development_branch,
      production_branch: this.props.production_branch,
      build_directory: this.props.build_directory,
      region: this.props.region
    }

    var templates = [
      { "src": "_travis.yml", "dest": ".travis.yml" },
    ];

    for (var key in templates) {
      var template = templates[key];
      var dest = template.dest === undefined ? template.src : template.dest;
      if (template.when === undefined || template.when === true) {
        this.fs.copyTpl(
          this.templatePath(template.src),
          this.destinationPath(dest),
          params
        );
      }
    }
  },

  // install: function () {
  //   // this.log(yosay('Installing dependencies. This might take a while'));
  //   // this.npmInstall();
  // },

  end: function () {
    this.log(yosay("Almost done, but we need sort out Travis now!"));
    // this.spawnCommand('travis', ['enable']);
    // this.spawnCommand('travis', ['env list']);

    // var opt = {
    //   shell: true
    // };
    // defaultShell.spawn('travis login', opt);
    // defaultShell.spawn('travis enable', opt);
    // defaultShell.spawn('travis env list', opt);

    this.log(chalk.blue.bold('We suggest you run these commands in a different window so you can follow the help instructions here!'));

    this.log("\n" + chalk.green.bold.underline('Travis CI:'));
    this.log(chalk.red.bold('travis enable') + ': enable travis integration.');
    this.log(chalk.red.bold('travis env set ARTIFACTS_KEY ' + this.props.artifacts_key));
    this.log(chalk.red.bold('travis env set ARTIFACTS_SECRET ' + this.props.artifacts_secret));
  }
});
