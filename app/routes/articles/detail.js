import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  session: service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model: function(params) {
    let _articlesModel = this.controllerFor('application').get('articlesModel');
    let result = null;
    if (_articlesModel) {
      result = _articlesModel
        .filter(item => {
          if (params.id === item.get('slug')) {
            return true;
          }
          return false;
        })
        .get('firstObject');
    } else {
      _articlesModel = this.get('store').query('article', { per_page: 500 });
      result = _articlesModel.then(models =>
        models
          .filter(item => {
            if (params.id === item.get('slug')) {
              return true;
            }
            return false;
          })
          .get('firstObject'),
      );
      this.controllerFor('application').set('articlesModel', _articlesModel);
    }
    return hash({
      articles: _articlesModel,
      article: result,
    });
    //return this.get('store').findRecord('product', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('articles.detail').set('article', model.article);
  },
});
