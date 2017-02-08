import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['latest-news', 'clearfix'],
  layoutName: 'components/latest-news',
  posts: null,
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  postsTrimmed: function(){
    return this.get('posts').slice(0,4);
  }.property('posts'),

  didInsertElement: function(){
    // debugger;
  },
});
