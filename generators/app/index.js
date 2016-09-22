'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to ' + chalk.red('King of App ') + chalk.blue('Spinner Generator') + '!'
    ));

    return this.prompt([{
      type: 'input',
      name: 'spinnerName',
      message: 'Spinner name',
      required: true
    }, {
      type: 'input',
      name: 'userName',
      message: 'Author\'s name'
    }, {
      type: 'input',
      name: 'spanishDescription',
      message: 'Spanish Description'
    }, {
      type: 'input',
      name: 'englishDescription',
      message: 'English Description'
    }, {
      type: 'inpt',
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'categories',
      message: 'Categories (comma to split)'
    }, {
      type: 'input',
      name: 'price',
      message: 'Price'
    }]).then(function (answers) {
      this.log('Thanks! The process will start now...');

      this.spinnerName = fixSpinnerName(answers.spinnerName, '-');
      this.userName = answers.userName;
      this.spanishDescription = answers.spanishDescription;
      this.englishDescription = answers.englishDescription;
      this.license = answers.license;
      this.categories = fixSpinnerCategories(answers.categories);
      this.price = answers.price;
    }.bind(this));
  },

  writing: function () {
    var _self = this;

    var folder = '/koapp-spinner-' + this.spinnerName;

    this.destinationRoot(this.destinationPath() + folder);

    var spinnerInput = {
      spinnerName: _self.spinnerName,
      userName: _self.userName,
      spanishDescription: _self.spanishDescription,
      englishDescription: _self.englishDescription,
      license: _self.license,
      categories: _self.categories,
      price: _self.price
    };

    this.fs.copyTpl(
      this.templatePath('koapp-spinner.html'),
      this.destinationPath('koapp-spinner-' + this.spinnerName + '.html'),
      spinnerInput
    );

    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'),
      spinnerInput
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      spinnerInput
    );
  }
});

/** Function that validate the Spinner name
* @returns {String}
*/
function fixSpinnerName(name, ReplaceSymbol) {
  name = name.toLowerCase().trim();
  return name.replace(/ /g, ReplaceSymbol);
}

/** Function that validate the Categories
* @returns {String}
*/
function fixSpinnerCategories(list) {
  list = list.replace(/ /g, '').toLowerCase().trim();
  var arrayCategories = list.split(',');
  return JSON.stringify(arrayCategories);
}
