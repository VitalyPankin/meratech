import Ember from 'ember';
import ENV from '../../../config/environment';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  search: null,
  category: null,
  host: function(){
    return ENV.wordpressHost;
  }.property(),
  placeholderText: t("common.search"),
  categoryTranslate: function(){
    return this.get('model.category').underscore();
  }.property('model'),
  isFile: function(){
    return (this.get('model.file_'+this.get('i18n.locale'))==='false' ? 0 : this.get('model.file_' + this.get('i18n.locale')));
  }.property('model','i18n.locale'),
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