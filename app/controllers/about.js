import Ember from 'ember';

export default Ember.Controller.extend({
  
  i18n: Ember.inject.service(),
  
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale')
});
