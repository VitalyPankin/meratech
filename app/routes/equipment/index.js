import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
	model(params) {
		return this.store.query('equipment', {per_page: 99});
	}
});
