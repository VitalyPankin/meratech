import Ember from 'ember';

export default Ember.Route.extend({


  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  	var industries = this.controllerFor('industries').get('industries');
    
  },
	model(params) {
		return this.controllerFor('industries').set('currentIndustry', params.id);
    // return this.get('store').findRecord('photo', params.id);
  }
});
