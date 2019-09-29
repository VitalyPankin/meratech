import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  session: service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model() {
    // return this.store.query('post', {per_page: 500});
    // return this.store.findAll('post');

    // By default the WP-API returns a maximum of 10 items.
    // To get more we can set the `per_page` query.
    //debugger;
    //return this.store.query('post', {per_page: 99});

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
    this.controllerFor('media-center').set('products', model.products);
    this.controllerFor('media-center').set('documents', model.documents);
  },
});
