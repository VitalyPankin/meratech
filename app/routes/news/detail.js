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
    let _postsModel = this.controllerFor('application').get('postsModel');
    let result = null;
    if (_postsModel) {
      result = _postsModel
        .filter(item => {
          if (params.id === item.get('slug')) {
            return true;
          }
          return false;
        })
        .get('firstObject');
    } else {
      _postsModel = this.get('store').query('post', { per_page: 500 });
      result = _postsModel.then(models =>
        models
          .filter(item => {
            if (params.id === item.get('slug')) {
              return true;
            }
            return false;
          })
          .get('firstObject'),
      );
      this.controllerFor('application').set('postsModel', _postsModel);
    }
    return hash({
      posts: _postsModel,
      post: result,
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('news.detail').set('post', model.post);
    this.controllerFor('news.detail').set('posts', model.posts);
  },
});
