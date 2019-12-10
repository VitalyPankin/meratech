import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';

import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  search: null,

  placeholderText: t('common.search'),

  // eslint-disable-next-line ember/no-function-prototype-extensions
  scrollInitializer: function() {
    if (this.get('anchor')) {
      try {
        var _this = this;
        run.schedule('afterRender', function scrollToAnchor() {
          // eslint-disable-next-line no-undef
          // eslint-disable-next-line ember/no-jquery
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

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  equipmentCategories: computed('equipment', function() {
    let categories = [];
    this.get('equipment')
      .uniqBy('category')
      .forEach(item => {
        if (item.get('category') && categories.indexOf(item.get('category')) < 0) {
          categories.push(item.get('category'));
        }
      });
    return categories.sort().reverse();
  }),

  productsSubCategorized: computed('equipmentCategories', 'equipment', function() {
    let result = [],
      // _this = this,
      categories = this.get('equipmentCategories');
    categories.forEach(category => {
      let filteredEquipment = this.get('equipment').filter(function(item) {
        if (category === item.get('category')) {
          return true;
        }
        return false;
      });
      let subresult = [];
      filteredEquipment
        .uniqBy('category_' + category)
        .sort()
        .forEach(_item => {
          subresult.push({
            subcategory: _item.get('category_' + category)
              ? _item.get('category_' + category).toString()
              : '',
            list: filteredEquipment
              .filter(function(__item) {
                if (_item.get('category_' + category) === __item.get('category_' + category)) {
                  return true;
                }
                return false;
              })
              .sort(function(a, b) {
                if (a.get('title') < b.get('title')) return -1;
                if (a.get('title') > b.get('title')) return 1;
                return 0;
              }),
          });
        });
      result.push({
        category: category.toString(),
        subcategories: subresult.sort(function(a, b) {
          if (a.subcategory > b.subcategory) return -1;
          if (a.subcategory < b.subcategory) return 1;
          return 0;
        }),
      });
    });
    return result;
  }),

  productsCategorized: computed('equipment', function() {
    let result = [];
    let _this = this;
    this.get('equipmentCategories').forEach(category => {
      let trans = _this.get('i18n').t('catalog.types.' + category);
      result.push({
        name: category,
        translate: trans,
        data: _this
          .get('productsFiltered')
          .filter(function(item) {
            return item.get('product_type') === category;
          })
          .sort(),
      });
    });
    return result;
  }),

  actions: {},
});
