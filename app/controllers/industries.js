import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { A } from '@ember/array';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  currentIndustry: null,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  industries: A([
    {
      name: 'brewery',
      title: () => this.get('i18n').t('industries.brewery'),
    },
    {
      name: 'milk',
      title: () => this.get('i18n').t('industries.milk_industry'),
    },
    {
      name: 'cows',
      title: () => this.get('i18n').t('industries.cow_farms'),
    },
    {
      name: 'pigs',
      title: () => this.get('i18n').t('industries.pig_farms'),
    },
    {
      name: 'poultry',
      title: () => this.get('i18n').t('industries.poultry'),
    },
    {
      name: 'meat',
      title: () => this.get('i18n').t('industries.meat_processing'),
    },
    {
      name: 'laundry',
      title: () => this.get('i18n').t('industries.laundry'),
    },
    {
      name: 'fish',
      title: () => this.get('i18n').t('industries.fish'),
    },
  ]),

  // eslint-disable-next-line ember/require-return-from-computed
  currentIndustryTitle: computed('currentIndustry', 'i18n.locale', function() {
    switch (this.get('currentIndustry')) {
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

  catalogFile: computed('documents', 'currentIndustry', function() {
    return this.get('documents').findBy('industry', this.get('currentIndustry'));
  }),

  productsIndustryFiltered: computed('products.[]', 'currentIndustry', function() {
    return this.get('products').filter(item => {
      let result = false;
      let filter = `application_${this.get('currentIndustry')}`;

      if (get(item, filter)) {
        result = true;
      }
      return result;
    });
  }),

  productsFormatted: computed('productsIndustryFiltered', function() {
    let productsIndustryFiltered = this.get('productsIndustryFiltered');

    productsIndustryFiltered.forEach(item => {
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

    return productsIndustryFiltered;
  }),

  productCategories: computed('productsFormatted', 'currentIndustry', function() {
    let categories = [];
    this.get('productsFormatted')
      .uniqBy('application_' + this.get('currentIndustry'))
      .forEach(item => {
        if (item.get('application_' + this.get('currentIndustry'))) {
          let value = item.get('application_' + this.get('currentIndustry'));

          value.forEach(_item => {
            if (categories.indexOf(_item) < 0) {
              categories.push(_item);
            }
          });
        }
      });
    return categories;
  }),

  productsCategorized: computed(
    'productCategories',
    'productsFormatted',
    'i18n.locale',
    function() {
      let result = [];

      this.get('productCategories').forEach(category => {
        let trans = this.get('i18n').t('catalog.types.' + category);
        result.push({
          name: category,
          translate: trans,
          data: this.get('productsFormatted').filter(item => {
            return item.get(`application_${this.get('currentIndustry')}`).indexOf(category) + 1;
          }),
        });
      });

      return result;
    },
  ),
});
