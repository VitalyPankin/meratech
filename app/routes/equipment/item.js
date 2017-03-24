import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
  model(params) {
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
  },

  setupController: function(controller, model, transition) {
    this._super(controller, model);
    this.controllerFor('equipment.category').set('equipment', model);
  }
});
