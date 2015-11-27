import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('catalog', { path: '/catalog' });
  this.route('news', { path: '/news' });
  this.route('contacts', { path: '/contacts' });
  this.route('industries', { path: '/industries' });
});

export default Router;
