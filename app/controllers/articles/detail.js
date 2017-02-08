import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
  post: null,
  i18n: Ember.inject.service(),
  isRuLocale: function(){
    return this.get('i18n.locale')==='ru';
  }.property('i18n.locale'),
  readableDate: function(){
    moment.locale(this.get('i18n.locale'));

    let value = moment(this.get('article.date').toString().substr(0, this.get('article.date').toString().indexOf('GMT')), 'ddd MMM DD YYYY HH:mm:ss');

    return value.format("dddd, MMMM Do,  YYYY");
  }.property('i18n.locale'),
  session: Ember.inject.service('session'),
  actions: {
  }
});