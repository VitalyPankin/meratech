import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model() {
    let _model = this.controllerFor('application').get('equipmentModel');
    if (_model) {
      return _model;
    } else {
      _model = this.store.query('item', { per_page: 500 });
      this.controllerFor('application').set('equipmentModel', _model);
      return _model;
    }
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('equipment.index').set('equipment', model);
  },
});
