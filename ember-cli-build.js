/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var pickFiles = require('broccoli-static-compiler'),
  mergeTrees = require('broccoli-merge-trees'),
  nodeSass = require('node-sass');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      implementation: require('node-sass'),
    },
    // sassOptions: {
    //   nodeSass: nodeSass
    // },
    fingerprint: {
      enabled: false,
    },
    sourcemaps: {
      enabled: true,
    },
    minifyJS: {
      enabled: false,
    },
    minifyCSS: {
      enabled: true,
    },
    outputPaths: {
      app: {
        html: 'index.html',
        css: {
          app: '/assets/meratech.css',
        },
        js: '/assets/meratech.js',
      },
      vendor: {
        css: '/assets/vendor.css',
        js: '/assets/vendor.js',
      },
    },
  });

  // var awesomeFonts = pickFiles('vendor/font-awesome/webfonts', {
  //   srcDir: '/',
  //   destDir: '/fonts',
  // });
  // var awesomeFonts = pickFiles('bower_components/font-awesome/fonts', {
  //   srcDir: '/',
  //   destDir: '/fonts',
  // });

  app.import('vendor/bootstrap/bootstrap.js');
  app.import('vendor/jquery/jquery.cookie.js');
  app.import('vendor/moment/moment.min.js');

  // app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  // app.import('bower_components/jquery.cookie/jquery.cookie.js');
  // app.import('bower_components/moment/min/moment.min.js');

  // app.import('bower_components/jquery-mousewheel/jquery.mousewheel.min.js');
  // app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
  // app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js');

  app.import('vendor/revolution/js/jquery.themepunch.revolution.min.js');
  app.import('vendor/revolution/js/jquery.themepunch.tools.min.js');
  app.import('vendor/revolution/css/settings.css');
  app.import('vendor/revolution/css/layers.css');
  app.import('vendor/revolution/css/navigation.css');

  var sliderRevolutionExtensions = pickFiles('vendor/revolution/js/extensions', {
    srcDir: '/',
    files: ['**/*.min.js'],
    destDir: '/assets/extensions',
  });

  app.import('vendor/bootstrap/bootstrap.css');
  // app.import('vendor/font-awesome/css/fontawesome.css');

  // app.import('bower_components/font-awesome/css/font-awesome.css');
  // app.import('bower_components/font-awesome/css/font-awesome.css.map', { destDir: 'assets' });
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  // app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });

  var modulesToBuild = [app.toTree(), sliderRevolutionExtensions];
  // var modulesToBuild = [app.toTree(), awesomeFonts, sliderRevolutionExtensions];

  return mergeTrees(modulesToBuild);
};
