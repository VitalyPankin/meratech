import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-navigation navbar navbar-default navbar-static-top'],
  layoutName: 'components/main-navigation',
  isActive: false,
  init() {
    this._super();
    this.get('i18n');
  },
  ruLocale: function(){
    // console.log(this.get('i18n.locale'));
    if(this.get('i18n.locale')==='ru') { return true; }
    return false; 
  }.property('i18n.locale'),
  actions:{
    setLocale: function(locale){
      this.set('i18n.locale', locale);
      Ember.$.cookie('user-lang', locale, {expires:365, path:'/'});
    }
  }
});
