import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
    // eslint-disable-next-line no-unused-vars
    let industries = this.controllerFor('industries').get('industries');
  },

  model(params) {
    return this.controllerFor('industries').set('currentIndustry', params.id);
    // return this.get('store').findRecord('photo', params.id);
  },
});
