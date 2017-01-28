import ENV from 'meratech/config/environment';
import Ember from 'ember';


function calculateLocale() {
  var lang = Ember.$.cookie('user-lang');
  var defaultLocale = (ENV.i18n || {}).defaultLocale;

  if (lang === undefined || lang.length > 3) {  // no cookie exists yet
      lang = defaultLocale;
  }
  return lang;
}

export function initialize(instance) {
	instance.lookup('service:i18n').set('locale', calculateLocale());
}

export default {
  name: 'ember-i18n',
  initialize: initialize
};