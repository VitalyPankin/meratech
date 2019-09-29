/* eslint-disable ember/no-jquery */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),

  filterIndustry: null,
  filterIndustryClass: null,
  filterFoamingClass: null,
  filterAcidClass: null,
  filterFoaming: null,
  filterAcid: null,
  searchQuery: null,
  searchField: null,
  placeholderText: t('common.search'),

  // eslint-disable-next-line ember/require-return-from-computed
  filterIndustryTitle: computed('filterIndustry', function() {
    switch (this.get('filterIndustry')) {
      case 'cows': {
        return this.get('i18n').t('industries.cow_farms');
      }
      case 'poultry': {
        return this.get('i18n').t('industries.poultry');
      }
      case 'pigs': {
        return this.get('i18n').t('industries.pig_farms');
      }
      case 'meat': {
        return this.get('i18n').t('industries.meat_processing');
      }
      case 'brewery': {
        return this.get('i18n').t('industries.brewery');
      }
      case 'milk': {
        return this.get('i18n').t('industries.milk_industry');
      }
      case 'laundry': {
        return this.get('i18n').t('industries.laundry');
      }
    }
  }),

  // eslint-disable-next-line ember/require-return-from-computed
  filterFoamingTitle: computed('filterFoaming', function() {
    switch (this.get('filterFoaming')) {
      case 1: {
        return this.get('i18n').t('catalog.not_foaming');
      }
      case 2: {
        return this.get('i18n').t('catalog.foaming_alt');
      }
    }
  }),

  // eslint-disable-next-line ember/require-return-from-computed
  filterAcidTitle: computed('filterAcid', function() {
    switch (this.get('filterAcid')) {
      case 'acidic': {
        return this.get('i18n').t('catalog.acidic');
      }
      case 'neutral': {
        return this.get('i18n').t('catalog.neutral');
      }
      case 'alkalic': {
        return this.get('i18n').t('catalog.alkalic');
      }
    }
  }),

  productsFormatted: computed('products', function() {
    // eslint-disable-next-line no-unused-vars
    let _this = this;
    return this.get('products').forEach(function(item) {
      let title = item.get('title');
      if (title.substr(0, title.indexOf(' '))) {
        if (title.indexOf('Aironit Forte') + 1) {
          item.set('title_formatted', 'Aironit Forte<sup>®</sup> <b>' + title.substr(14) + '</b>');
        } else {
          item.set(
            'title_formatted',
            title.substr(0, title.indexOf(' ')) +
              '<sup>®</sup> <b>' +
              title.substr(title.indexOf(' ') + 1) +
              '</b>',
          );
        }
      } else {
        item.set('title_formatted', item.get('title') + '<sup>®</sup>');
      }
    });
  }),

  productsFiltered: computed(
    'filterIndustry',
    'filterFoaming',
    'filterAcid',
    'searchQuery',
    'productsFormatted',
    function() {
      let _this = this;
      return this.get('productsFormatted').filter(function(item) {
        let result = true;
        if (_this.get('searchQuery')) {
          result =
            (item
              .get('title')
              .toLowerCase()
              .indexOf(_this.get('searchQuery').toLowerCase()) + 1 ||
              item
                .get('description_ru')
                .toLowerCase()
                .indexOf(_this.get('searchQuery').toLowerCase()) + 1 ||
              item
                .get('description_en')
                .toLowerCase()
                .indexOf(_this.get('searchQuery').toLowerCase()) + 1) &&
            result;
        }
        if (_this.get('filterIndustry')) {
          result = item.get('industry').includes(_this.get('filterIndustry')) && result;
        }
        if (_this.get('filterFoaming')) {
          result = item.get('foaming') === Boolean(_this.get('filterFoaming') - 1) && result;
        }
        if (_this.get('filterAcid')) {
          if (_this.get('filterAcid') === 'acidic') {
            result = item.get('ph') < 4 && result;
          }
          if (_this.get('filterAcid') === 'neutral') {
            result = item.get('ph') >= 4 && item.get('ph') < 7 && result;
          }
          if (_this.get('filterAcid') === 'alkalic') {
            result = item.get('ph') > 7 && result;
          }
        }
        // if(result){
        // 	console.log(item.get('title'));
        // }
        return result;
      });
    },
  ),

  productCategories: computed('productsFiltered', function() {
    let categories = [
      'opc_cleaning',
      'cip_cleaning',
      'additive',
      'agriculture',
      'lubricant',
      'disinfectant',
      'laundry',
      'personal',
    ];
    this.get('productsFiltered')
      .uniqBy('product_type')
      .forEach(item => {
        if (item.get('product_type') && categories.indexOf(item.get('product_type')) < 0) {
          categories.push(item.get('product_type'));
        }
      });
    return categories;
  }),

  productsCategorized: computed('productsFiltered', 'i18n.locale', function() {
    let result = [];
    let _this = this;
    this.get('productCategories').forEach(category => {
      let trans = _this.get('i18n').t('catalog.types.' + category);
      result.push({
        name: category,
        translate: trans,
        data: _this.get('productsFiltered').filter(function(item) {
          return item.get('product_type') === category;
        }),
      });
    });
    return result;
  }),

  actions: {
    search: function() {
      this.set('searchQuery', this.get('searchField'));
      this.set('isSearchOn', true);
    },
    setIndustryFilter(value) {
      if (value) {
        this.set('filterIndustryClass', 'hidden');
      } else {
        this.set('filterIndustryClass', '');
      }
      this.set('filterIndustry', value);
    },
    setFoamingFilter(value) {
      if (value) {
        this.set('filterFoamingClass', 'hidden');
      } else {
        this.set('filterFoamingClass', '');
        $('#radio1').prop('checked', true);
      }
      this.set('filterFoaming', value);
    },
    setAcidFilter(value) {
      if (value) {
        this.set('filterAcidClass', 'hidden');
      } else {
        this.set('filterAcidClass', '');
      }
      this.set('filterAcid', value);
    },
  },
});
