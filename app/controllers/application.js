import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
	currentPath: null,
	wat: "sfdasfawefre",
	isAboutRoute: false,
  productsModel: null,
  documentsModel: null,
  postsModel: null,
  articlesModel: null,

  init() {
    this.get('i18n');
  },
  ruLocale: function(){
    // console.log(this.get('i18n.locale'));
    if(this.get('i18n.locale')==='ru') { return true; }
    return false; 
  }.property('i18n.locale'),
  updateCurrentPath: function() {
    this.set('currentPath', this.get('currentPath'));
    console.log(this.get('currentPath'));
    if(this.get('currentPath')==='about'){
	    this.set('isAboutRoute', true);
    }else{
	    this.set('isAboutRoute', false);
    }
  }.observes('currentPath'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});