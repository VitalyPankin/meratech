import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },

    sessionInvalidationSucceeded: function() {
      var currentRoute = this.controllerFor('application').get('currentRouteName');

      if (currentRoute === 'application') {
        // window.location.reload();
      } else {
        this._super(...arguments);
      }
    },

    loading(transition) {
      let ajaxloaderElement = document.getElementById('ajax-loader');
      ajaxloaderElement.setAttribute('class', 'loading-notify is-load');
      transition.promise.finally(function() {
        ajaxloaderElement.setAttribute('class', 'loading-notify');
      });
    },
  },
});
