import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),
  cachedModel: null,

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model: function(params) {
    return this.get('store')
      .query('page', { filter: { name: params.id } })
      .then(models => models.get('firstObject'));
    //return this.get('store').findRecord('product', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    // this.controllerFor('content').set('product', model);
  },
});
