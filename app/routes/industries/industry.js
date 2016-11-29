import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(params) {
  	var industries = this.controllerFor('industries').get('industries');
    
  },
	model(params) {
		return this.controllerFor('industries').set('currentIndustry', params.id);
    // return this.get('store').findRecord('photo', params.id);
  }
});
