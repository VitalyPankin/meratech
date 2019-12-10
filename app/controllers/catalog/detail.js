/* eslint-disable ember/no-jquery */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

import ENV from '../../config/environment';
// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  session: service('session'),
  docuFolder: 'wpContent/uploads/publicDocuments/',

  host: ENV.wordpressHost,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  contentAvailable: computed('advantages', 'usage', 'description', function() {
    if (this.get('advantages') || this.get('usage') || this.get('description')) {
      return true;
    }
    return false;
  }),

  title_formatted: computed('product', function() {
    let title = this.get('product.title');
    if (title.substr(0, title.indexOf(' '))) {
      return (
        '<span style="color: ' +
        this.get('product.color_code_style') +
        '">' +
        title.substr(0, title.indexOf(' ')) +
        '<sup>®</sup></span> ' +
        title.substr(title.indexOf(' ') + 1)
      );
    } else {
      return title + '<sup>®</sup>';
    }
  }),

  description: computed('product', 'i18n.locale', function() {
    return this.get('product.description_' + this.get('i18n.locale'));
  }),

  date: computed('product', function() {
    let date = this.get('product.registration_date');
    if (this.get('product.registration_date')) {
      date.substr(6) + '.' + date.substr(4, 2) + '.' + date.substr(0, 4);
    }
    return 0;
  }),

  mark: computed('product', function() {
    let name = this.get('product.mark.firstObject')
      ? this.get('product.mark.firstObject').trim()
      : '';
    return {
      name: name,
      translate: name
        ? 'catalog.mark.mark_' +
          this.get('product.mark')
            .get('firstObject')
            .trim()
            .toLowerCase()
        : '',
    };
  }),

  density: computed('product', function() {
    return this.get('product.density').toLocaleString(this.get('i18n.locale'));
  }),

  ph: computed('product', function() {
    return this.get('product.ph').toLocaleString(this.get('i18n.locale'));
  }),

  consistency: computed('product', function() {
    return 'catalog.' + this.get('product.consistency');
  }),

  safety: computed('product', function() {
    // eslint-disable-next-line no-unused-vars
    let result = this.get('product.safety').forEach(item => {
      item = String(item).trim();
    });
    return result;
  }),

  risk_phrases: computed('product', function() {
    let phrases = this.get('product.risk_phrases')
      .replace(' ', '')
      .split(',');
    let result = [];
    phrases.forEach(item => {
      if (item.trim()) {
        result.push({
          name: item.trim(),
          translate: 'catalog.phrases.' + item.trim(),
        });
      }
    });
    return result;
  }),

  safety_phrases: computed('product', function() {
    let phrases = this.get('product.safety_phrases')
      .replace(' ', '')
      .split(',');
    let result = [];
    phrases.forEach(item => {
      if (item.trim()) {
        result.push({
          name: item.trim(),
          translate: 'catalog.phrases.' + item.trim(),
        });
      }
    });
    return result;
  }),

  colorName: computed('product', 'i18n.locale', function() {
    return this.get('product.color_name_' + this.get('i18n.locale'));
  }),

  advantages: computed('product', 'i18n.locale', function() {
    return this.get('product.advantages_' + this.get('i18n.locale'));
  }),

  breathe: computed('product', 'i18n.locale', function() {
    return this.get('product.breathe_' + this.get('i18n.locale'));
  }),

  environment: computed('product', 'i18n.locale', function() {
    return this.get('product.environment_' + this.get('i18n.locale'));
  }),

  eyes: computed('product', 'i18n.locale', function() {
    return this.get('product.eyes_' + this.get('i18n.locale'));
  }),

  hands: computed('product', 'i18n.locale', function() {
    return this.get('product.hands_' + this.get('i18n.locale'));
  }),

  storage: computed('product', 'i18n.locale', function() {
    return this.get('product.storage_' + this.get('i18n.locale'));
  }),

  usage: computed('product', 'i18n.locale', function() {
    return this.get('product.usage_' + this.get('i18n.locale'));
  }),

  phtitle: computed('product', 'i18n.locale', function() {
    return (
      this.get('docuFolder')
        .underscore()
        .dasherize()
        .substr(0, 19) +
      '/file' +
      ENV.moduleHandler +
      '/../'
    );
  }),

  registration: computed('product', 'i18n.locale', function() {
    if (
      this.get('product.registration') &&
      this.get('product.registration').indexOf(this.get('i18n.locale')) + 1
    ) {
      return (
        ENV.wordpressHost +
        'wp-content/uploads/documents/' +
        'registration_' +
        this.get('product.slug').underscore() +
        '_' +
        this.get('i18n.locale') +
        '.pdf'
      );
    }
    return false;
  }),

  leaflet: computed('product', 'i18n.locale', function() {
    if (
      this.get('product.leaflet') &&
      this.get('product.leaflet').indexOf(this.get('i18n.locale')) + 1
    ) {
      return (
        ENV.wordpressHost +
        'wp-content/uploads/public-documents/' +
        'leaflet_' +
        this.get('product.slug').underscore() +
        '_' +
        this.get('i18n.locale') +
        '.pdf'
      );
    }
    return false;
  }),

  safed: computed('product', 'i18n.locale', function() {
    if (
      this.get('product.' + String('s') + 'D'.toLowerCase() + 's-'.substr(0, 1)) &&
      this.get('product.' + String('s') + 'D'.toLowerCase() + 's-'.substr(0, 1)).indexOf(
        this.get('i18n.locale'),
      ) + 1
    ) {
      return (
        ENV.wordpressHost +
        this.get('phtitle').substr(0, 19) +
        ENV.timeDimention.underscore() +
        'URED/'.toLowerCase() +
        String('s') +
        'D'.toLowerCase() +
        's-'.underscore() +
        this.get('product.slug').underscore() +
        '_' +
        this.get('i18n.locale') +
        '.' +
        ENV.print
      );
    }
    return false;
  }),

  prod: computed('product', 'i18n.locale', function() {
    if (
      this.get('product.' + String('p') + 'D'.toLowerCase() + 's-'.substr(0, 1)) &&
      this.get('product.' + String('p') + 'D'.toLowerCase() + 's-'.substr(0, 1)).indexOf(
        this.get('i18n.locale'),
      ) + 1
    ) {
      return (
        ENV.wordpressHost +
        this.get('phtitle').substr(0, 19) +
        ENV.timeDimention.underscore() +
        'URED/'.toLowerCase() +
        String('p') +
        'D'.toLowerCase() +
        's-'.underscore() +
        this.get('product.slug').underscore() +
        '_' +
        this.get('i18n.locale') +
        '.' +
        ENV.print
      );
    }
    return false;
  }),

  actions: {
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
