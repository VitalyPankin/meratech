/* eslint-disable ember/no-jquery */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';

import ENV from '../../../config/environment';
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  search: null,
  category: null,
  placeholderText: t('common.search'),

  host: ENV.wordpressHost,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  categoryTranslate: computed('model', function() {
    return this.get('model.category').underscore();
  }),

  isFile: computed('model', 'i18n.locale', function() {
    return this.get('model.file_' + this.get('i18n.locale')) === 'false'
      ? 0
      : this.get('model.file_' + this.get('i18n.locale'));
  }),

  // eslint-disable-next-line ember/no-function-prototype-extensions
  scrollInitializer: function() {
    if (this.get('anchor')) {
      try {
        var _this = this;
        run.schedule('afterRender', function scrollToAnchor() {
          var elem = $(_this.get('anchor'));
          elem.get(0).scrollIntoView(true);
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Bad scroll transition to ' + this.get('anchor'));
      }
    }
  }
    .on('init')
    .observes('anchor'),

  actions: {},
});
