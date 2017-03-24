import Ember from 'ember';

export default Ember.Route.extend({
  cachedModel: null,
  session: Ember.inject.service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
  
  model: function(params) {

    let _productsModel = this.controllerFor('application').get('productsModel');
    let result = null;
    if(_productsModel){
      result = _productsModel.filter((item)=>{
        if(params.id === item.get('slug')){
          return true;
        }
        return false;
      }).get('firstObject');
    }else{
      _productsModel = this.get('store').query('product', {per_page: 500});
      result = _productsModel.then(models => models.filter((item)=>{
        if(params.id === item.get('slug')){
          return true;
        }
        return false;
      }).get('firstObject'));
      this.controllerFor('application').set('productsModel', _productsModel);
    }
    return result;

  	// return this.get('store').query('product', {filter: {name: params.id}}).then(models => models.get('firstObject'));
    //return this.get('store').findRecord('product', params.id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('catalog.detail').set('product', model);
  }
});
