import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  session: service('session'),
  store: service(),

  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
    // var industries = this.controllerFor('industries').get('industries');

    // TODO

    // var currentIndustry = transition.params.industries.id;
    // if (!industries.isAny('name', currentIndustry)) {
    //   this.transitionTo('/not-found');
    // }
  },

  model(params) {
    this.controllerFor('industries').set('currentIndustry', params.id);
    // eslint-disable-next-line no-unused-vars
    let industry = params.id;

    let _productsModel = this.controllerFor('application').get('productsModel');
    if (_productsModel) {
      // ?
    } else {
      _productsModel = this.get('store').query('product', { per_page: 500 });
      this.controllerFor('application').set('productsModel', _productsModel);
    }

    let _documentsModel = this.controllerFor('application').get('documentsModel');
    if (_documentsModel) {
      // ?
    } else {
      _documentsModel = this.get('store').query('document', { per_page: 500 });
      this.controllerFor('application').set('documentsModel', _documentsModel);
    }
    return hash({
      documents: _documentsModel,
      products: _productsModel,
    });
  },

  setupController: function(controller, model) {
    this._super(...arguments);
    this.controllerFor('industries').set('products', model.products);
    this.controllerFor('industries').set('documents', model.documents);
  },
});
