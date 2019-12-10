'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

let pickFiles = require('broccoli-static-compiler'),
  mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      implementation: require('node-sass'),
    },

    babel: {
      plugins: ['@babel/plugin-proposal-object-rest-spread'],
    },
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

  var awesomeFonts = pickFiles('vendor/font-awesome/fonts', {
    srcDir: '/',
    destDir: '/fonts',
  });

  app.import('vendor/bootstrap/bootstrap.js');
  app.import('vendor/jquery/jquery.cookie.js');

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
  app.import('vendor/font-awesome/font-awesome.css');

  var modulesToBuild = [app.toTree(), awesomeFonts, sliderRevolutionExtensions];

  return mergeTrees(modulesToBuild);
};
