import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel: function() {
    this.transitionTo('press-center');
  },

  // activate: function() {
  //   this.controllerFor('news.index').set('toDate', null);
  //   this.controllerFor('news.index').set('fromDate', null);
  // },

  // beforeModel: function(transition) {
  //   if (!this.get('session.isAuthenticated')) {
  //     this.set('session.attemptedTransition', transition);
  //   }
  // },

  // model: function() {
  //   let _postsModel = this.controllerFor('application').get('postsModel');
  //   if (_postsModel) {
  //     // ?
  //   } else {
  //     _postsModel = this.get('store').query('post', { per_page: 500 });
  //     this.controllerFor('application').set('postsModel', _postsModel);
  //   }
  //   return _postsModel;
  // },

  // setupController: function(controller, model) {
  //   this._super(controller, model);
  //   this.controllerFor('news.index').set('posts', model);
  // },
});
