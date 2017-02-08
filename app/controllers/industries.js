import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  currentIndustry: null,
  i18n: Ember.inject.service(),
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  industries: Ember.A([
    {
      name: 'brewery',
      title: () => this.get('i18n').t("industries.brewery")
    },
    {
      name: 'milk',
      title: () => this.get('i18n').t("industries.milk_industry")
    },
    {
      name: 'cows',
      title: () => this.get('i18n').t("industries.cow_farms")
    },
    {
      name: 'pigs',
      title: () => this.get('i18n').t("industries.pig_farms")
    },
    {
      name: 'poultry',
      title: () => this.get('i18n').t("industries.poultry")
    },
    {
      name: 'meat',
      title: () => this.get('i18n').t("industries.meat_processing")
    },
    {
      name: 'laundry',
      title: () => this.get('i18n').t("industries.laundry")
    },
    {
      name: 'fish',
      title: () => this.get('i18n').t("industries.fish")
    }
  ]),
  currentIndustryTitle: function(){
    switch(this.get('currentIndustry')){
      case 'cows':{
        return this.get('i18n').t("industries.cow_farms");
      }
      case 'poultry':{
        return this.get('i18n').t("industries.poultry");
      }
      case 'pigs':{
        return this.get('i18n').t("industries.pig_farms");
      }
      case 'meat':{
        return this.get('i18n').t("industries.meat_processing");
      }
      case 'brewery':{
        return this.get('i18n').t("industries.brewery");
      }
      case 'milk':{
        return this.get('i18n').t("industries.milk_industry");
      }
      case 'laundry':{
        return this.get('i18n').t("industries.laundry");
      }
    }
  }.property('currentIndustry', 'i18n.locale'),
  catalogFile: function(){
    return this.get('documents').findBy("industry", this.get('currentIndustry'));
  }.property('documents','currentIndustry'),
  productsIndustryFiltered: function(){
    let _this = this;
    return this.get('products').filter(function(item, index, enumerable){
      let result = false;
      let filter = 'application_'+_this.get('currentIndustry');
      if(!!item.get(filter)) { result=true; }
      return result;
    });
  }.property('products','currentIndustry'),
  productsFormatted: function(){
    this.get('productsIndustryFiltered').forEach(function(item, index, enumerable){
      let title = item.get('title');
      if(title.substr(0, title.indexOf(' '))){
        if(title.indexOf('Aironit Forte')+1){
          item.set('title_formatted', 'Aironit Forte<sup>®</sup> <b>'+title.substr(14)+'</b>');  
        }else{
          item.set('title_formatted', title.substr(0, title.indexOf(' '))+'<sup>®</sup> <b>'+title.substr(title.indexOf(' ')+1)+'</b>');  
        }
      }else{
        item.set('title_formatted',item.get('title')+'<sup>®</sup>');
      }
    });
    return this.get('productsIndustryFiltered');
  }.property('productsIndustryFiltered'),
  productCategories: function(){
    let categories = ["opc_cleaning", 'cip_cleaning', 'additive', 'agriculture', 'lubricant', 'disinfectant', 'laundry', 'personal'];
    this.get('productsFormatted').uniqBy('product_type').forEach((item) => {
      if(item.get('product_type') && categories.indexOf(item.get('product_type'))<0){ 
        categories.push(item.get('product_type')); 
      }
    });
    return categories;
  }.property('productsFormatted','currentIndustry'),
  productsCategorized: function(){
    let result = [];
    let _this=this;
    this.get('productCategories').forEach((category, index) => {
        let trans = _this.get('i18n').t("catalog.types."+category);
        result.push({
          name: category,
          translate: trans,
          data: _this.get('productsFormatted').filter(function(item, index, enumerable){
              return item.get('product_type') === category;
            })
        }); 
    });
    return result;
  }.property('productsFormatted')
});
