import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  addressesCategories: computed('addresses', function() {
    let categories = [];
    this.get('addresses')
      .uniqBy('type')
      .forEach(item => {
        if (item.get('type') && categories.indexOf(item.get('type')) < 0) {
          categories.push(item.get('type'));
        }
      });
    return categories.sort();
  }),

  addressesCategorized: computed('addressesCategories', function() {
    let result = [];
    let _this = this;
    this.get('addressesCategories').forEach(category => {
      // eslint-disable-next-line no-unused-vars
      let trans = _this.get('i18n').t('contacts.types.' + category);
      result.push({
        name: category,
        data: _this.get('addresses').filter(function(item) {
          return item.get('type') === category;
        }),
      });
    });
    return result;
  }),
});
