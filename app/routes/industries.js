import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(params) {
  	var industries = this.controllerFor('industries').get('industries');
  	var currentIndustry = params.params.industries.id;
  	if(!industries.isAny('name', currentIndustry)){
  		this.transitionTo('/not-found');
  	}
  },
	model(params) {
		return this.controllerFor('industries').set('currentIndustryName', params.id);
    // return this.get('store').findRecord('photo', params.id);
  }
});
