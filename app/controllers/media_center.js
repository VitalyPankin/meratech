import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

import ENV from '../config/environment';
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  session: service('session'),
  searchQuery: false,
  searchField: '',
  isSearchOn: false,
  placeholderText: t('common.search'),
  docuFolder: 'wpContent/uploads/publicDocuments/',

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  phtitle: computed('product', 'i18n.locale', function() {
    return (
      this.get('docuFolder')
        .underscore()
        .dasherize()
        .substr(0, 19) +
      '/file' +
      ENV.moduleHandler +
      '../'
    );
  }),

  productsFiltered: computed('products', 'searchQuery', function() {
    let _this = this;
    if (this.get('products')) {
      //debugger;
      return this.get('products').filter(function(item) {
        if (_this.get('searchQuery')) {
          if (
            item
              .get('title')
              .toLowerCase()
              .indexOf(_this.get('searchQuery').toLowerCase()) >= 0
          ) {
            return true;
          }
        }
        return false;
      });
    } else {
      return [];
    }
  }),

  documentsFiltered: computed('documents', 'searchQuery', 'i18n.locale', function() {
    let _this = this;
    if (this.get('documents')) {
      //debugger;
      return this.get('documents').filter(function(item) {
        if (_this.get('searchQuery')) {
          if (
            item
              .get('title_' + _this.get('i18n.locale'))
              .toLowerCase()
              .indexOf(_this.get('searchQuery').toLowerCase()) >= 0
          ) {
            return true;
          }
          if (
            item
              .get('tags')
              .toLowerCase()
              .indexOf(_this.get('searchQuery').toLowerCase()) >= 0
          ) {
            return true;
          }
        }
        return false;
      });
    } else {
      return [];
    }
  }),

  listDocumentsResult: computed(
    'documentsFiltered',
    'session.isAuthenticated',
    'i18n.locale',
    function() {
      let _this = this,
        result = [];
      this.get('documentsFiltered').forEach(function(item) {
        result.push({
          name: item.get('title_' + _this.get('i18n.locale')),
          type: item.get('type'),
          link: item.get('file'),
          image: item.get('image'),
        });
      });
      return result;
    },
  ),

  documentsLatest: computed('documents', 'isEquipmentCatalog', function() {
    let _this = this,
      result = [],
      length;
    if (this.get('isEquipmentCatalog')) {
      length = 2;
    } else {
      length = 4;
    }
    this.get('documents').forEach(function(item) {
      if (item.get('industry') !== 'equipment') {
        result.push({
          name: item.get('title_' + _this.get('i18n.locale')),
          type: item.get('type'),
          link: item.get('file'),
          image: item.get('image'),
        });
      }
    });
    return result.slice(0, length);
  }),

  isEquipmentCatalog: computed('documents', function() {
    let result = this.get('documents').filter(function(item) {
      if (item.get('industry') === 'equipment') {
        return true;
      }
      return false;
    });
    return result[0];
  }),

  listResult: computed('productsFiltered', 'session.isAuthenticated', 'i18n.locale', function() {
    let _this = this,
      result = [];

    function leafletLink(value) {
      if (
        value.get(String('s') + 'D'.toLowerCase() + 's-'.substr(0, 1)) &&
        value
          .get(String('s') + 'D'.toLowerCase() + 's-'.substr(0, 1))
          .indexOf(_this.get('i18n.locale') + 1)
      ) {
        return (
          ENV.wordpressHost +
          _this.get('phtitle').substr(0, 19) +
          ENV.timeDimention.underscore() +
          'URED/'.toLowerCase() +
          String('s') +
          'D'.toLowerCase() +
          's-'.underscore() +
          value.get('slug').underscore() +
          '_' +
          _this.get('i18n.locale') +
          '.' +
          ENV.print
        );
      }
      return false;
    }
    function regLink(value) {
      if (
        value.get(String('p') + 'D'.toLowerCase() + 's-'.substr(0, 1)) &&
        value
          .get(String('p') + 'D'.toLowerCase() + 's-'.substr(0, 1))
          .indexOf(_this.get('i18n.locale') + 1)
      ) {
        return (
          ENV.wordpressHost +
          _this.get('phtitle').substr(0, 19) +
          ENV.timeDimention.underscore() +
          'URED/'.toLowerCase() +
          String('p') +
          'D'.toLowerCase() +
          's-'.underscore() +
          value.get('slug').underscore() +
          '_' +
          _this.get('i18n.locale') +
          '.' +
          ENV.print
        );
      }
      return false;
    }
    this.get('productsFiltered').forEach(function(item) {
      let title = item.get('title');
      if (title.substr(0, title.indexOf(' '))) {
        if (title.indexOf('Aironit Forte') + 1) {
          title = 'Aironit Forte<sup>®</sup> ' + title.substr(14);
        } else {
          title =
            title.substr(0, title.indexOf(' ')) +
            '<sup>®</sup> ' +
            title.substr(title.indexOf(' ') + 1);
        }
      } else {
        title = item.get('title') + '<sup>®</sup>';
      }

      if (item.get('leaflet') && item.get('leaflet').indexOf(_this.get('i18n.locale')) + 1) {
        result.push({
          name: title,
          type: 'leaflet',
          size: Math.floor(600 + Math.random() * 100),
          link:
            ENV.wordpressHost +
            'wp-content/uploads/public-documents/' +
            'leaflet_' +
            item.get('slug').underscore() +
            '_' +
            _this.get('i18n.locale') +
            '.pdf',
        });
      }
      if (_this.get('session.isAuthenticated')) {
        if (item.get('registration') && item.get('registration').indexOf('ru') + 1) {
          result.push({
            name: title,
            size: Math.floor(800 + Math.random() * 150),
            type: 'registration_ru',
            link:
              ENV.wordpressHost +
              _this.get('phtitle').substr(0, 19) +
              ENV.timeDimention.underscore() +
              'URED/'.toLowerCase() +
              'registration_' +
              item.get('slug').underscore() +
              '_ru.pdf',
          });
        }
        if (item.get('registration') && item.get('registration').indexOf('en') + 1) {
          result.push({
            name: title,
            size: Math.floor(800 + Math.random() * 150),
            type: 'registration_en',
            link:
              ENV.wordpressHost +
              _this.get('phtitle').substr(0, 19) +
              ENV.timeDimention.underscore() +
              'URED/'.toLowerCase() +
              'registration_' +
              item.get('slug').underscore() +
              '_en.pdf',
          });
        }
        if (item.get('sds') && item.get('sds').indexOf(_this.get('i18n.locale')) + 1) {
          result.push({
            name: title,
            type: 'leaflet_',
            size: Math.floor(200 + Math.random() * 80),
            link: leafletLink(item),
          });
        }
        if (item.get('pds') && item.get('pds').indexOf(_this.get('i18n.locale')) + 1) {
          result.push({
            name: title,
            type: 'registration_',
            size: Math.floor(100 + Math.random() * 50),
            link: regLink(item),
          });
        }
      }
    });
    return result;
  }),

  actions: {
    search: function() {
      this.set('searchQuery', this.get('searchField'));
      this.set('isSearchOn', true);
    },
  },
});
