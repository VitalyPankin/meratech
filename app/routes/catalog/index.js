import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model: function() {
    let _model = this.controllerFor('application').get('productsModel');
    if (_model) {
      return _model;
    } else {
      _model = this.store.query('product', { per_page: 500 });
      this.controllerFor('application').set('productsModel', _model);
      return _model;
    }
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('catalog.index').set('products', model);
  },
});
