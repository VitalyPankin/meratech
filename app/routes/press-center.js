import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  session: service('session'),

  activate: function() {
    this.controllerFor('press-center').set('toDate', null);
    this.controllerFor('press-center').set('fromDate', null);
  },

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model() {
    let _postsModel = this.controllerFor('application').get('postsModel');
    if (_postsModel) {
      // ?
    } else {
      _postsModel = this.get('store').query('post', { per_page: 500 });
      this.controllerFor('application').set('postsModel', _postsModel);
    }

    let _articlesModel = this.controllerFor('application').get('articlesModel');
    if (_articlesModel) {
      // ?
    } else {
      _articlesModel = this.get('store').query('article', { per_page: 500 });
      this.controllerFor('application').set('articlesModel', _articlesModel);
    }
    return hash({
      articles: _articlesModel,
      posts: _postsModel,
    });
  },

  setupController: function(controller, model) {
    this._super(...arguments);
    this.controllerFor('press-center').set('posts', model.posts);
    this.controllerFor('press-center').set('articles', model.articles);
  },
});
