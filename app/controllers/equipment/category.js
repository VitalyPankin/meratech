/* eslint-disable ember/no-jquery */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';

import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  search: null,
  category: null,
  placeholderText: t('common.search'),

  // eslint-disable-next-line ember/no-function-prototype-extensions
  scrollInitializer: function() {
    if (this.get('anchor')) {
      try {
        run.schedule('afterRender', () => {
          let elem = $(this.get('anchor'));
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

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  actions: {},
});
