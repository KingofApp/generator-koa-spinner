'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koapp-spinner:app', function () {
  this.timeout(15000);
  var spinnerName = '   new spinner';
  var anwsers = {
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Spinner',
    englishDescription: 'My new Spinner',
    license: 'MIT',
    categories: '   spinners,DOCumentation, demo',
    price: '0'
  };

  var anwsersExpected = {
    spinnerName: 'new-spinner',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo Spinner',
    englishDescription: 'My new Spinner',
    license: 'MIT',
    categories: ['spinners', 'documentation', 'demo'],
    price: 0
  };

  before(function () {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([answers.pluginName])
      .withOptions(answers)
      .on('end', done);
  });

  it('creates file koapp-spinner-' + anwsersExpected.spinnerName + '.html', function () {
    assert.file([
      'koapp-spinner-' + anwsersExpected.spinnerName + '.html'
    ]);
  });

  it('creates file .bowerrc', function () {
    assert.file([
      '.bowerrc'
    ]);
  });

  it('creates file bower.json', function () {
    assert.file([
      'bower.json'
    ]);
  });

  it('check content bower.json', function () {
    assert.jsonFileContent('bower.json', {
      name: 'koapp-spinner-' + anwsersExpected.spinnerName,
      authors: anwsersExpected.userName,
      description: anwsersExpected.englishDescription,
      main: 'koapp-spinner-' + anwsersExpected.spinnerName + '.html',
      license: anwsersExpected.license
    });
  });

  it('creates file config.json', function () {
    assert.file([
      'config.json'
    ]);
  });

  it('check content config.json', function () {
    assert.jsonFileContent('config.json', {
      name: anwsersExpected.spinnerName,
      identifier: 'koapp-spinner-' + anwsersExpected.spinnerName,
      description: {
        'en-US': anwsersExpected.spanishDescription,
        'es-ES': anwsersExpected.englishDescription
      },
      author: anwsersExpected.userName,
      category: anwsersExpected.categories,
      price: anwsersExpected.price,
      main: 'spinners/koapp-spinner-' + anwsersExpected.spinnerName + '/koapp-spinner-' + anwsersExpected.spinnerName + '.html'
    });
  });
});
