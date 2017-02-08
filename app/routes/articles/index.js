import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  

  beforeModel: function(transition) {
     this.transitionTo('press-center');
  }
});
