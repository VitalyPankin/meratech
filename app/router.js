import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contacts', { path: '/contacts' });
  this.route('index', { path: '/' });
  this.resource('news', function() {
    this.route('news', {
      path: '/news/:id'
    }); 
    this.route('detail');   
    this.route('index');   
	});
  this.route('press-center', { path: '/press-center' });
  // this.route("subscribers", {
  //   path: '/'
  // }, function() {
  //   this.route('subscriber', {
  //     path: '/subscribers/:id'
  //   });
  // });
  this.resource("catalog",  function() {
    this.route('detail');  
	});
  this.route('equipment', function() {
    this.route('detail', {
      path: '/equipment/:id'
    });  
	});

});

export default Router;
