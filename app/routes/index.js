import Ember from 'ember';
export default Ember.Route.extend({
  model() {
    let _postsModel = this.controllerFor('application').get('postsModel');
    if(_postsModel){
      
    }else{
      _postsModel = this.get('store').query('post', {per_page: 500});
      this.controllerFor('application').set('postsModel', _postsModel);
    }
    return _postsModel;
  },
  setupController: function(controller, model) {
    this._super(...arguments);
  }
});