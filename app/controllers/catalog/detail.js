import Ember from 'ember';
import ENV from '../../config/environment';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  session: Ember.inject.service('session'),
  contentAvailable: function(){
    if(this.get('advantages') || this.get('usage') || this.get('description')){
      return true;
    }
    return false;
  }.property('advantages','usage','description'),
  docuFolder: 'wpContent/uploads/publicDocuments/',
  host: function(){
    return ENV.wordpressHost;
  }.property(),
  title_formatted: function(){
    let title = this.get('product.title');
    if(title.substr(0, title.indexOf(' '))){
      return '<span style="color: '+this.get('product.color_code_style')+'">'+title.substr(0, title.indexOf(' '))+'<sup>®</sup></span> '+title.substr(title.indexOf(' ')+1);  
    }else{
      return title+'<sup>®</sup>';
    }
  }.property('product'),
  description: function(){
    return this.get('product.description_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  date: function(){
    let date = this.get('product.registration_date');
    if(this.get('product.registration_date')) { date.substr(6)+'.'+date.substr(4,2)+'.'+date.substr(0,4);}
    return 0;
  }.property('product'),
  mark: function(){ 
    let name = this.get('product.mark.firstObject') ? this.get('product.mark.firstObject') .trim() : '';
    return {
      name: name,
      translate: name ? "catalog.mark.mark_"+this.get('product.mark').get('firstObject').trim().toLowerCase() : ''
    };
  }.property('product'),
  density: function(){
    return this.get('product.density').toLocaleString(this.get('i18n.locale'));
  }.property('product'),
  ph: function(){
    return this.get('product.ph').toLocaleString(this.get('i18n.locale'));
  }.property('product'),
  consistency: function(){
    return 'catalog.'+this.get('product.consistency');
  }.property('product'),
  safety: function(){
    let result = this.get('product.safety').forEach((item)=>{
      item = String(item).trim();
    });
    return result;
  }.property('product'),
  risk_phrases: function(){
    let phrases = this.get('product.risk_phrases').replace(" ", "").split(",");
    let result = [];
    phrases.forEach((item) => {
      if(item.trim()){
        result.push({
          name: item.trim(),
          translate: "catalog.phrases."+item.trim()
        });
      }
    });
    return result;
  }.property('product'),
  safety_phrases: function(){
    let phrases = this.get('product.safety_phrases').replace(" ", "").split(",");
    let result = [];
    phrases.forEach((item) => {
      if(item.trim()){
        result.push({
          name: item.trim(),
          translate: "catalog.phrases."+item.trim()
        });
      }
    });
    return result;
  }.property('product'),
  colorName: function(){
    return this.get('product.color_name_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  advantages: function(){
    return this.get('product.advantages_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  breathe: function(){
    return this.get('product.breathe_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  environment: function(){
    return this.get('product.environment_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  eyes: function(){
    return this.get('product.eyes_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  hands: function(){
    return this.get('product.hands_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  storage: function(){
    return this.get('product.storage_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  usage: function(){
    return this.get('product.usage_'+this.get('i18n.locale'));
  }.property('product','i18n.locale'),
  phtitle: function(){
    return this.get('docuFolder').underscore().dasherize().substr(0,19)+'/file'+ENV.moduleHandler+'/../';
  }.property('product','i18n.locale'),
  registration: function(){
    if(this.get('product.registration') && (this.get('product.registration').indexOf(this.get('i18n.locale'))+1)){
      return ENV.wordpressHost+'wp-content/uploads/documents/'+'registration_'+this.get('product.slug').underscore()+"_"+this.get('i18n.locale')+'.pdf';
    }
    return false;
  }.property('product','i18n.locale'),
  leaflet: function(){
    if(this.get('product.leaflet') && (this.get('product.leaflet').indexOf(this.get('i18n.locale'))+1)){
      return ENV.wordpressHost+'wp-content/uploads/public-documents/'+'leaflet_'+this.get('product.slug').underscore()+"_"+this.get('i18n.locale')+'.pdf';
    }
    return false;
  }.property('product','i18n.locale'),
  safed: function(){
    if(this.get('product.'+String('s')+('D').toLowerCase()+('s-').substr(0,1)) && (this.get('product.'+String('s')+('D').toLowerCase()+('s-').substr(0,1)).indexOf(this.get('i18n.locale'))+1)){
      return ENV.wordpressHost+this.get('phtitle').substr(0,19)+ENV.timeDimention.underscore()+('URED/').toLowerCase()+String('s')+('D').toLowerCase()+('s-').underscore()+this.get('product.slug').underscore()+"_"+this.get('i18n.locale')+"."+ENV.print;
    }
    return false;
  }.property('product','i18n.locale'),
  prod: function(){
    if(this.get('product.'+String('p')+('D').toLowerCase()+('s-').substr(0,1)) && (this.get('product.'+String('p')+('D').toLowerCase()+('s-').substr(0,1)).indexOf(this.get('i18n.locale'))+1)){
      return ENV.wordpressHost+this.get('phtitle').substr(0,19)+ENV.timeDimention.underscore()+('URED/').toLowerCase()+String('p')+('D').toLowerCase()+('s-').underscore()+this.get('product.slug').underscore()+"_"+this.get('i18n.locale')+"."+ENV.print;
    }
    return false;
  }.property('product','i18n.locale'),
  actions: {
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