import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: function() {
    if (ENV.environment === 'development') {
      return 'https://qa-ws.wydevoice.com';
    } else {
      return location.protocol + '//' + location.host;
    }
  }.property(),

  moderatorHost: function() {
    if (ENV.environment === 'development') {
      return 'http://localhost:4201/';
    } else {
      return location.protocol + '//' + location.host + '/moderator';
    }
  }.property(),

  swaggerHost: function() {
    if (ENV.environment === 'development') {
      return 'http://localhost:4201';
    } else {
      return location.protocol + '//' + location.host + '/api-docs';
    }
  }.property(),

  swaggerJsonUrl: function() {
    if (ENV.environment === 'development') {
      return 'http://qa-ws.wydevoice.com/wyderef/swagger.json';
    } else {
      return location.protocol + '//' + location.host + '/wyderef/swagger.json';
    }
  }.property(),

  wsHost: function() {
    if (ENV.environment === 'development') {
      return 'wss://qa-ws.wydevoice.com';
    } else {
      return 'wss://' + location.host;
    }
  }.property(),

  namespace: 'meratech'
});