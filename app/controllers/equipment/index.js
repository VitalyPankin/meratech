import Ember from 'ember';
import ENV from '../../config/environment';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  search: null,
  host: function(){
    return ENV.wordpressHost;
  }.property(),
  placeholderText: t("common.search"),
  equipmentCategories: function(){
    let categories = [];
    this.get('model').uniqBy('category').forEach((item) => {
      if(item.get('category') && categories.indexOf(item.get('category'))<0){ 
        categories.push({name: item.get('category'), underscore: item.get('category').underscore()}); 
      }
    });
    return categories.sort().reverse();
  }.property('model'),
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  i18n: Ember.inject.service(),
  actions: {
  }
});