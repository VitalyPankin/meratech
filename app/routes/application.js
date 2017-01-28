import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Ember.Route.extend(ApplicationRouteMixin, {
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        },
		    sessionInvalidationSucceeded: function(){
		      var currentRoute = this.controllerFor('application').get('currentRouteName');

		      if (currentRoute === 'application') {
		        // window.location.reload();
		      } else {
		        this._super();
		      }
		    }
    }
    
});