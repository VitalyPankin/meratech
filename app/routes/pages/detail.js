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
    return this.get('store').query('page', {filter: {name: params.id}}).then(models => models.get('firstObject'));
    //return this.get('store').findRecord('product', params.id);
  },

  setupController: function(controller, model) {
    if(!model){
      this.transitionTo('not-found');
    }
    this._super(controller, model);
    // this.controllerFor('content').set('product', model);
  }
});
