import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },
  model: function() {

    let _postsModel = this.controllerFor('application').get('postsModel');
    if(_postsModel){
      
    }else{
      _postsModel = this.get('store').query('post', {per_page: 500});
      this.controllerFor('application').set('postsModel', _postsModel);
    }
    return _postsModel;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('news.index').set('posts', model);
  }
});
