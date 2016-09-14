'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to '+chalk.red('King of App ')+chalk.blue('Spinner Generator')+'!'
    ));

    return this.prompt([{
      type    : 'input',
      name    : 'spinnerName',
      message : 'Your Spinner name',
      default : 'new-spinner'
    }, {
      type    : 'input',
      name    : 'userName',
      message : 'Your Name'
    }, {
      type    : 'input',
      name    : 'spanishDescription',
      message : 'Spanish Description'
    }, {
      type    : 'input',
      name    : 'englishDescription',
      message : 'English Description'
    }, {
      type    : 'input',
      name    : 'price',
      message : 'Price'
    }, {
      type    : 'confirm',
      name    : 'showOnMarket',
      message : 'Would you like to show your spinner in our market?'
    }]).then(function (answers) {

      this.log('Thanks! The process will start now...');
      
      this.spinnerName = answers.spinnerName;
      this.userName = answers.userName;
      this.spanishDescription = answers.spanishDescription;
      this.englishDescription = answers.englishDescription;      
      this.price = answers.price;
      this.showOnMarket = answers.showOnMarket;
      
    }.bind(this));
    
  },

  writing: function () {
    var _self = this;
    
    console.log("Spinner Name1", this.spinnerName);
    
    var folder = "/koapp-spinner-"+this.spinnerName;
    
    this.destinationRoot(this.destinationPath() + folder);
    
    var spinnerInput = {
      spinnerName: _self.spinnerName,
      userName: _self.userName,
      spanishDescription: _self.spanishDescription,
      englishDescription: _self.englishDescription,
      price: _self.price,
      showOnMarket: _self.showOnMarket 
    };
    
    console.log("Spinner Name2", spinnerInput.spinnerName);
    
    this.fs.copyTpl(
      this.templatePath('koapp-spinner.html'),
      this.destinationPath('koapp-spinner-'+this.spinnerName+'.html'),
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
