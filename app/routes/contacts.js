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
    let _adressessModel = this.controllerFor('application').get('adressessModel');
    if (_adressessModel) {
      // ?
    } else {
      _adressessModel = this.get('store').query('address', { per_page: 500 });
      this.controllerFor('application').set('adressessModel', _adressessModel);
    }
    return _adressessModel;
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('contacts').set('addresses', model);
  },
});
