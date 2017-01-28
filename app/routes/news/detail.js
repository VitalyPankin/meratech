import Ember from 'ember';

export default Ember.Route.extend({
  

  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
  model: function(params) {
  	return this.get('store').query('posts', {filter: {name: params.id}}).then(models => models.get('firstObject'));
    //return this.get('store').findRecord('product', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('catalog.detail').set('posts', model);
  }
});
