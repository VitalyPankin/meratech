import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('news', function() {
    this.route('news', {
      path: '/news/:id'
    });  
	});
  this.route('contacts', { path: '/contacts' });
  this.route('industries', { path: '/industries' });
  // this.route("subscribers", {
  //   path: '/'
  // }, function() {
  //   this.route('subscriber', {
  //     path: '/subscribers/:id'
  //   });
  // });
  this.route("catalog",  function() {
    this.route('catalog', {
      path: '/catalog/:id'
    });  
	});
  this.route('equipment', function() {
    this.route('equipment', {
      path: '/equipment/:id'
    });  
	});

});

export default Router;
