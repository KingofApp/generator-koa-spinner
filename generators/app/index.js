'use strict';
var yeoman = require('yeoman-generator');
var tools = require('koapp');

module.exports = yeoman.Base.extend({

  init: function () {
    var self = this;

    this.argument('pluginName', {type: String, desc: 'Spinner name', alias: 'n', required: true});
    this.option('homepage', {type: String, desc: 'Author\'s homepage', alias: 'w'});
    this.option('userName', {type: String, desc: 'Author\'s name', alias: 'u'});
    this.option('spanishDescription', {type: String, desc: 'Spanish description', alias: 's'});
    this.option('englishDescription', {type: String, desc: 'English description', alias: 'e'});
    this.option('price', {type: Number, desc: 'Price', alias: 'p', default: 0});
    this.option('license', {type: String, desc: 'License', alias: 'l', default: 'MIT'});
    this.option('categories', {type: tools.parseCategories, desc: 'Categories (comma to split)', alias: 'c'});

    ['homepage', 'userName', 'spanishDescription', 'englishDescription', 'license', 'price'].forEach(function (id) {
      self[id] = self.options[id];
    });
    var pluginName = this.arguments[0].toLowerCase();
    this.pluginName = tools.fixPluginName(pluginName, '-');
    this.categories = tools.fixPluginCategories(this.options.categories || 'others');
  },

  writing: function () {
    var _self = this;

    var folder = '/koapp-spinner-' + this.pluginName;

    this.destinationRoot(this.destinationPath() + folder);

    var spinnerInput = {
      homepage: _self.homepage,
      pluginName: _self.pluginName,
      userName: _self.userName,
      spanishDescription: _self.spanishDescription,
      englishDescription: _self.englishDescription,
      license: _self.license,
      categories: _self.categories,
      price: _self.price
    };

    tools.copy(_self, 'copy', '.bowerrc', '.bowerrc');
    tools.copy(_self, 'copyTpl', 'config.json', 'config.json', spinnerInput);
    tools.copy(_self, 'copyTpl', 'bower.json', 'bower.json', spinnerInput);
    tools.copy(_self, 'copyTpl', 'koapp-spinner.html', 'koapp-spinner-' + this.pluginName + '.html', spinnerInput);
  }
});
