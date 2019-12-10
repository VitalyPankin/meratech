/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/main-navigation';

export default Component.extend({
  classNames: ['main-navigation navbar navbar-default navbar-static-top'],
  // layoutName: 'components/main-navigation',
  layout,
  isActive: false,

  init() {
    this._super(...arguments);
    this.get('i18n');
  },

  ruLocale: computed('i18n.locale', function() {
    // console.log(this.get('i18n.locale'));
    if (this.get('i18n.locale') === 'ru') {
      return true;
    }
    return false;
  }),

  actions: {
    setLocale: function(locale) {
      this.set('i18n.locale', locale);
      $.cookie('user-lang', locale, { expires: 365, path: '/' });
    },
  },
});
