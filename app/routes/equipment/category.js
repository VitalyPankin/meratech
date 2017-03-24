import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  toItem: false,
  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
    if(transition.targetName==='equipment.category.item'){
      this.set('toItem', true);
    }else{
      this.set('toItem', false);
    }
  },
  model(params) {
    this.controllerFor('equipment.category.index').set('category', params.category_id);
    this.controllerFor('equipment.category.index').set('isCleaningCatalog', (params.category_id).indexOf('pressure')+1 ? true : false);
    let category = params.category_id;


    let _model = this.controllerFor('application').get('equipmentModel');
    if(_model){
      let __model = _model.filter((item)=>{
        if(item.get('category')===category) return true;
        return false;
      });
      let length = __model.length;
      if(length === 0){
        this.transitionTo('/not-found');
      }else if(length===1){
        if(!this.get('toItem')){
          this.transitionTo('equipment.category.item', __model.get('firstObject').get('slug'));
        }
      }
      return __model;
    }else{
      return this.store.query('item', {per_page: 500}).then(_model => {
        let __model = _model.filter((item)=>{
          if(item.get('category')===category) return true;
          return false;
        });
        let length = __model.length;
        if(length === 0){
          this.transitionTo('/not-found');
        }else if(length===1){
          if(!this.get('toItem')){
            this.transitionTo('equipment.category.item', __model.get('firstObject').get('slug'), { queryParams: { id: __model.get('firstObject').get('slug'), item_id: __model.get('firstObject').get('slug') }});
          }
        }
        this.controllerFor('application').set('equipmentModel', _model);
        return __model;
      });
    }
  },

  setupController: function(controller, model, transition) {
    this._super(controller, model);
    this.controllerFor('equipment.category').set('equipment', model);
  }
});
