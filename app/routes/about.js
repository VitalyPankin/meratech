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

  model: function() {
    return this.get('store')
      .query('page', { filter: { name: 'about' } })
      .then(models => models.get('firstObject'));
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    // this.controllerFor('content').set('product', model);
  },
});
