import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  searchField: '',
  currentCategory: null,
  articlesActive: false,
  confirmedValue: '',
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  readableDate: function(){
    moment.locale(this.get('i18n.locale'));
    return moment().format("dddd, MMMM Do,  YYYY");
  }.property('i18n.locale'),
  currentCategoryTitle: function(){
    return this.get('i18n').t("press_center."+this.get("currentCategory")+"_");
  }.property('currentCategory','i18n.locale'),
  postsFiltered: function(){
    let _this = this;
    if(!this.get('currentCategory')) {
      return this.get('posts');
    }
    return this.get('posts').filter(function(item, index, enumerable){
      if(item.get('category') == _this.get('currentCategory')) { return true; }
      return false;
    });
  }.property('posts','currentCategory'),
  postsTrimmed: function(){
    return this.get('postsFiltered').slice(0,4);
  }.property('postsFiltered'),
  articlesTrimmed: function(){
    return this.get('articles').slice(0,2);
  }.property('articles'),
  articlesFull: function(){
    return this.get('articles').slice(2,this.get('articles.length'));
  }.property('articles'),
  actions: {
    setFilter: function(value) {
      if(value){
        this.set('currentCategory',value);
      }else{
        this.set('currentCategory', '');
      }
    },
    articlesActiveToggle: function() {
      this.set('articlesActive',!this.get('articlesActive'));
    }
  }
});
