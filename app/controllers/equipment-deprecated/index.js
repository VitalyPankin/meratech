import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  search: null,
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
  equipmentCategories: function(){
    let categories = [];
    this.get('equipment').uniqBy('category').forEach((item) => {
      if(item.get('category') && categories.indexOf(item.get('category'))<0){ 
        categories.push(item.get('category')); 
      }
    });
    return categories.sort().reverse();
  }.property('equipment'),
  productsSubCategorized: function(){
    let result = [],
        _this=this,
        categories = this.get('equipmentCategories');
    categories.forEach((category, indexCategory) => {
      let filteredEquipment = this.get('equipment').filter(function(item, index, enumerable){
        if(category === item.get('category')) {
          return true;
        }
        return false;
      });
      let subresult = [];
      filteredEquipment.uniqBy('category_'+category).sort().forEach((_item) => {
        subresult.push({
          subcategory: _item.get('category_'+category) ? _item.get('category_'+category).toString() : '',
          list: filteredEquipment.filter(function(__item, index, enumerable){
            if(_item.get('category_'+category) === __item.get('category_'+category)) {
              return true;
            }
            return false;
          }).sort(function(a,b) {
          if (a.get('title') < b.get('title'))
            return -1;
          if (a.get('title') > b.get('title'))
            return 1;
          return 0;
        })
        });
      });
      result.push({
        category: category.toString(),
        subcategories: subresult.sort(function(a,b) {
          if (a.subcategory > b.subcategory)
            return -1;
          if (a.subcategory < b.subcategory)
            return 1;
          return 0;
        })
      }); 
    });
    return result;
  }.property('equipmentCategories','equipment'),
  productsCategorized: function(){
    let result = [];
    let _this=this;
    this.get('equipmentCategories').forEach((category, index) => {
        let trans = _this.get('i18n').t("catalog.types."+category);
        result.push({
          name: category,
          translate: trans,
          data: _this.get('productsFiltered').filter(function(item, index, enumerable){
              return item.get('product_type') === category;
            }).sort()
        }); 
    });
    return result;
  }.property('equipment'),
  actions: {
  }
});