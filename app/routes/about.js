import Ember from 'ember';

export default Ember.Route.extend({
  cachedModel: null,
  session: Ember.inject.service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
  
  model: function(params) {
  	return this.get('store').query('page', {filter: {name: 'about'}}).then(models => models.get('firstObject'));
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    // this.controllerFor('content').set('product', model);
  }
});
