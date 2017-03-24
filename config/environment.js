/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'meratech',
    environment: environment,
    wordpressHost: 'http://api.meratech.ru/',
    rootURL: '/',
    locationType: 'auto',
    timeDimention: 'Sec',
    i18n: {
      defaultLocale: 'ru'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moduleHandler: '_manager',
    print: 'pdf'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:local-storage',
      authorizer: 'authorizer:api-meratech',
      crossOriginWhitelist: ['http://localhost:3001/'],
      routeAfterAuthentication: '/protected'
  };
  }

  if (environment === 'production') {

  }

  return ENV;
};
