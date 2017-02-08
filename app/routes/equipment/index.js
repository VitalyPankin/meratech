import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
	model(params) {
    let _model = this.controllerFor('application').get('equipmentModel');
    if(_model){
      return _model;
    }else{
      _model = this.store.query('item', {per_page: 500});
      this.controllerFor('application').set('equipmentModel', _model);
      return _model;
    }
	},

  setupController: function(controller, model, transition) {
    this._super(controller, model);
    this.controllerFor('equipment.index').set('equipment', model);
    this.controllerFor('equipment.index').set('anchor', transition.queryParams.anchor);
  }
});
