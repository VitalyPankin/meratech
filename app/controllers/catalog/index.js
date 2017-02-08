import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  filterIndustry: null,
  filterIndustryClass: null,
  filterFoamingClass: null,
  filterAcidClass: null,
  filterIndustryTitle: function(){
  	switch(this.get('filterIndustry')){
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
  }.property('filterIndustry'),
  filterFoaming: null,
  filterFoamingTitle: function(){
  	switch(this.get('filterFoaming')){
	  	case 1:{
	  		return this.get('i18n').t("catalog.not_foaming");
	  	}
	  	case 2:{
	  		return this.get('i18n').t("catalog.foaming_alt");
	  	}
	  }
  }.property('filterFoaming'),
  filterAcid: null,
  filterAcidTitle: function(){
  	switch(this.get('filterAcid')){
	  	case 'acidic':{
	  		return this.get('i18n').t("catalog.acidic");
	  	}
	  	case 'neutral':{
	  		return this.get('i18n').t("catalog.neutral");
	  	}
	  	case 'alkalic':{
	  		return this.get('i18n').t("catalog.alkalic");
	  	}
	  }
  }.property('filterAcid'),
  searchQuery: null,
  searchField: null,
  placeholderText: t("common.search"),
  i18n: Ember.inject.service(),
  productsFormatted: function(){
  	let _this = this;
  	return this.get('products').forEach(function(item, index, enumerable){
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
  }.property('products'),
  productsFiltered: function(){
  	let _this = this;
  	return this.get('productsFormatted').filter(function(item, index, enumerable){
  		let result = true;
  		if(_this.get('searchQuery')){
  		 	result = ((item.get('title').toLowerCase().indexOf(_this.get('searchQuery').toLowerCase())+1) || (item.get('description_ru').toLowerCase().indexOf(_this.get('searchQuery').toLowerCase())+1) || (item.get('description_en').toLowerCase().indexOf(_this.get('searchQuery').toLowerCase())+1)) && result;
  		}
  		if(_this.get('filterIndustry')){
  		 	result = item.get('industry').includes(_this.get('filterIndustry')) && result;
  		}
  		if(_this.get('filterFoaming')){
  			result = item.get('foaming')===Boolean(_this.get('filterFoaming')-1) && result;
  		}
  		if(_this.get('filterAcid')){
  			if(_this.get('filterAcid')==='acidic'){
  				result = (item.get('ph')<4) && result;
  			}
  			if(_this.get('filterAcid')==='neutral'){
  				result = (item.get('ph')>=4) && (item.get('ph')<7) && result;
  			}
  			if(_this.get('filterAcid')==='alkalic'){
  				result = (item.get('ph')>7) && result;
  			}
  		}
  		// if(result){
	  	// 	console.log(item.get('title'));
	  	// }
	    return result;
	  });
  }.property('filterIndustry','filterFoaming','filterAcid','searchQuery','productsFormatted'),
  productCategories: function(){
  	let categories = ["opc_cleaning", 'cip_cleaning', 'additive', 'agriculture', 'lubricant', 'disinfectant', 'laundry', 'personal'];
  	this.get('productsFiltered').uniqBy('product_type').forEach((item) => {
  		if(item.get('product_type') && categories.indexOf(item.get('product_type'))<0){ 
  			categories.push(item.get('product_type')); 
  		}
  	});
  	return categories;
  }.property('productsFiltered'),
  productsCategorized: function(){
  	let result = [];
  	let _this=this;
  	this.get('productCategories').forEach((category, index) => {
  			let trans = _this.get('i18n').t("catalog.types."+category);
  			result.push({
  				name: category,
  				translate: trans,
  				data: _this.get('productsFiltered').filter(function(item, index, enumerable){
  						return item.get('product_type') === category;
	  				})
  			}); 
  	});
  	return result;
  }.property('productsFiltered'),
  actions: {
    search: function(value) {
      this.set('searchQuery',this.get('searchField'));
      this.set('isSearchOn',true);
    },
  	setIndustryFilter(value){
  		if(value){
  			this.set('filterIndustryClass', 'hidden');
  		}else{
  			this.set('filterIndustryClass', '');
  		}
  		this.set('filterIndustry', value);
  	},
  	setFoamingFilter(value){
  		if(value){
  			this.set('filterFoamingClass', 'hidden');
  		}else{
  			this.set('filterFoamingClass', '');
  			Ember.$('#radio1').prop('checked', true);
  		}
  		this.set('filterFoaming', value);
  	},
  	setAcidFilter(value){
  		if(value){
  			this.set('filterAcidClass', 'hidden');
  		}else{
  			this.set('filterAcidClass', '');
  		}
  		this.set('filterAcid', value);
  	}
  }
});