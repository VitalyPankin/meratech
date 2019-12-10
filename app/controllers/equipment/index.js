import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

import ENV from '../../config/environment';
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  search: null,
  placeholderText: t('common.search'),

  host: ENV.wordpressHost,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  equipmentCategories: computed('model', function() {
    let categories = [];
    this.get('model')
      .uniqBy('category')
      .forEach(item => {
        if (item.get('category') && categories.indexOf(item.get('category')) < 0) {
          categories.push({
            name: item.get('category'),
            underscore: item.get('category').underscore(),
          });
        }
      });

    return categories.sort().reverse();
  }),

  actions: {},
});
