import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  search: null,
  placeholderText: t('common.search'),
  fromDate: null,
  toDate: null,
  counter: 1,
  displayItems: 1,

  init() {
    this._super(...arguments);
    this.set('toDate', null);
    this.set('fromDate', null);
  },

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  currentCategoryTitle: computed('currentCategory', 'i18n.locale', function() {
    return this.get('i18n').t('press_center.' + this.get('currentCategory') + '_');
  }),

  minimalDate: computed('posts', function() {
    let minimalDate = this.get('posts.firstObject').get('date');
    this.get('posts').forEach(function(item) {
      if (item.get('date') < minimalDate) {
        minimalDate = item.get('date');
      }
    });
    return moment(
      minimalDate.toString().substr(0, minimalDate.toString().indexOf('GMT')),
      'ddd MMM DD YYYY HH:mm:ss',
    );
  }),

  todayDate: computed('posts', function() {
    return moment();
  }),

  fromDateSelected: computed('minimalDate', 'fromDate', function() {
    if (this.get('fromDate')) {
      return this.get('fromDate');
    }
    return this.get('minimalDate');
  }),

  toDateSelected: computed('toDate', 'todayDate', function() {
    if (this.get('toDate')) {
      return this.get('toDate');
    }
    return this.get('todayDate');
  }),

  postsFiltered: computed(
    'posts',
    'currentCategory',
    'toDate',
    'fromDate',
    'search',
    'i18n.locale',
    function() {
      let _this = this;
      return this.get('posts').filter(function(item) {
        let date = moment(
          item
            .get('date')
            .toString()
            .substr(
              0,
              item
                .get('date')
                .toString()
                .indexOf('GMT'),
            ),
          'ddd MMM DD YYYY HH:mm:ss',
        );
        if (_this.get('search')) {
          let search = _this.get('search');
          if (
            item
              .get('title_' + _this.get('i18n.locale'))
              .toLowerCase()
              .indexOf(search.toLowerCase()) + 1 ||
            item
              .get('preview_' + _this.get('i18n.locale'))
              .toLowerCase()
              .indexOf(search.toLowerCase()) + 1 ||
            item
              .get('text_' + _this.get('i18n.locale'))
              .toLowerCase()
              .indexOf(search.toLowerCase()) + 1
          ) {
            // ?
          } else {
            return false;
          }
        }
        if (_this.get('currentCategory')) {
          if (item.get('category') !== _this.get('currentCategory')) {
            return false;
          }
        }
        if (_this.get('toDate')) {
          if (_this.get('toDate').diff(date, 'days') < 0) {
            return false;
          }
        }
        if (_this.get('fromDate')) {
          if (_this.get('fromDate').diff(date, 'days') > 0) {
            return false;
          }
        } else {
          if (
            moment()
              .subtract(1, 'year')
              .diff(date, 'days') > 0
          ) {
            return false;
          }
        }
        return true;
      });
    },
  ),

  postsOrdered: computed('postsFiltered', function() {
    return this.get('postsFiltered')
      .sortBy('date')
      .reverse();
  }),

  actions: {
    setFilter(value) {
      if (value) {
        this.set('currentCategory', value);
      } else {
        this.set('currentCategory', '');
      }
    },

    articlesActiveToggle: function() {
      this.set('articlesActive', !this.get('articlesActive'));
    },
  },
});
