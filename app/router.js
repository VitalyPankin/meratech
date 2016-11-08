import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contacts', { path: '/contacts' });
  this.route('about', { path: '/about' });
  this.route('media-center', { path: '/media' });
  this.route('index', { path: '/' });
 //  this.resource('news', function() {
 //    this.route('news', {
 //      path: '/news/:id'
 //    }); 
 //    this.route('detail');   
 //    this.route('index');   
	// });
  this.route('press-center', { path: '/press-center' });

  this.route('news', function(){
    this.route('new', {
      path: '/news/:id'
    });
  });  
  this.route('articles', function(){
    this.route('article', {
      path: '/articles/:id'
    });
  }); 
  // this.route('industries'); 
  this.route('industries', {
      path: '/industry/:id'
    });
  // this.route("subscribers", {
  //   path: '/'
  // }, function() {
  //   this.route('subscriber', {
  //     path: '/subscribers/:id'
  //   });
  // });
  this.route("catalog",  function() {
    this.route('detail');  
	});
 //  this.route('equipment', function() {
 //    this.route('detail', {
 //      path: '/equipment/:id'
 //    });  
	// });
  this.route('equipment', function() {
    this.route('detail');  
  });
  this.route('not-found', {path: '/*wildcard'});
});

export default Router;
