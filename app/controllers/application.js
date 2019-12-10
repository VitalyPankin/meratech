import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';

export default Controller.extend({
  session: service('session'),
  ajaxLoader: service('ajax-loader'),
  currentPath: null,
  isAboutRoute: false,
  productsModel: null,
  documentsModel: null,
  postsModel: null,
  articlesModel: null,

  init() {
    this._super(...arguments);
    this.get('i18n');
  },

  ruLocale: computed('i18n.locale', function() {
    // console.log(this.get('i18n.locale'));
    if (this.get('i18n.locale') === 'ru') {
      return true;
    }
    return false;
  }),

  // eslint-disable-next-line ember/no-observers
  updateCurrentPath: observer('target.currentPath', function() {
    this.set('currentPath', this.get('target.currentPath'));
    // eslint-disable-next-line no-console
    if (this.get('currentPath') === 'about' || this.get('currentPath') === 'not-found') {
      this.set('isAboutRoute', true);
    } else {
      this.set('isAboutRoute', false);
    }
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session')
        .authenticate('authenticator:oauth2', identification, password)
        .catch(reason => {
          this.set('errorMessage', reason.error || reason);
        });
    },
  },
});
