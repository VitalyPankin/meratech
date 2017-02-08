import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  
  i18n: Ember.inject.service(),
  
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),

  addressesCategories: function(){
  	let categories = [];
  	this.get('addresses').uniqBy('type').forEach((item) => {
  		if(item.get('type') && categories.indexOf(item.get('type'))<0){ 
  			categories.push(item.get('type')); 
  		}
  	});
  	return categories.sort();
  }.property('addresses'),

  addressesCategorized: function(){
  	let result = [];
  	let _this=this;
  	this.get('addressesCategories').forEach((category, index) => {
  			let trans = _this.get('i18n').t("contacts.types."+category);
  			result.push({
  				name: category,
  				data: _this.get('addresses').filter(function(item, index, enumerable){
  						return item.get('type') === category;
	  				})
  			}); 
  	});
  	return result;
  }.property('addressesCategories'),
});
