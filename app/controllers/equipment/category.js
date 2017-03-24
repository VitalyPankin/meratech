import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  search: null,
  category: null,
  placeholderText: t("common.search"),
  scrollInitializer: function () {
    if(this.get('anchor')){
      try{
        var _this = this;
        Ember.run.schedule('afterRender', function scrollToAnchor(){
          var elem = Ember.$(_this.get('anchor'));
          elem.get(0).scrollIntoView(true);
        });
      }
      catch(e){
        console.log('Bad scroll transition to '+this.get('anchor'));
      }
    }
  }.on('init').observes('anchor'),
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  i18n: Ember.inject.service(),
  actions: {
  }
});