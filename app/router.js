import EmberRouter from '@ember/routing/router';
import config from './config/environment';

EmberRouter.reopen({
  doSomething: function() {
    window.scrollTo(0, 0);
    return;
  }.on('didTransition'),
});

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('contacts', { path: '/contacts' });
  this.route('about', { path: '/about' });
  this.route('media-center', { path: '/media-center' });
  this.route('index', { path: '/' });
  //  this.resource('news', function() {
  //    this.route('news', {
  //      path: '/news/:id'
  //    });
  //    this.route('detail');
  //    this.route('index');
  // });
  this.route('press-center', { path: '/press-center' });

  this.route('articles', function() {
    this.route('detail', {
      path: '/:id',
    });
  });

  this.route('pages', function() {
    this.route('detail', {
      path: '/:id',
    });
  });
  this.route('news', function() {
    this.route('detail', {
      path: '/:id',
    });
  });
  // this.route('industries');
  this.route('industries', {
    path: '/industry/:id',
  });
  // this.route("subscribers", {
  //   path: '/'
  // }, function() {
  //   this.route('subscriber', {
  //     path: '/subscribers/:id'
  //   });
  // });
  this.route('catalog', function() {
    this.route('detail', {
      path: '/:id',
    });
  });

  //  this.route('equipment', function() {
  //    this.route('detail', {
  //      path: '/equipment/:id'
  //    });
  // });
  this.route('equipment', function() {
    this.route('category', { path: ':category_id' }, function() {
      this.route('item', { path: ':item_id' });
    });
  });
  //  this.route('equipment', { path: '/equipment' , queryParams: ['anchor']});
  this.route('equipment', { path: '/equipment' });
  this.route('not-found', { path: '/*wildcard' });
});

export default Router;
