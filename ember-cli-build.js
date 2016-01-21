/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var awesomeFonts = pickFiles('bower_components/font-awesome/fonts', {
      srcDir: '/',
      destDir: '/fonts'
  });


  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  // app.import('bower_components/jquery.cookie/jquery.cookie.js');
  // app.import('bower_components/jquery-mousewheel/jquery.mousewheel.min.js');
  // app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
  // app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js');


  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/font-awesome/css/font-awesome.css.map', { destDir: 'assets' });
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });

  return mergeTrees([app.toTree(), awesomeFonts]);

};
