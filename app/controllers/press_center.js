import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  searchField: '',
  currentCategory: null,
  articlesActive: false,
  confirmedValue: '',
  search: null,
  placeholderText: t('common.search'),
  fromDate: null,
  toDate: null,
  counter: 1,
  displayItems: 1,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  readableDate: computed('i18n.locale', function() {
    moment.locale(this.get('i18n.locale'));
    return moment().format('dddd, MMMM Do,  YYYY');
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

    const valueDate = new Date(
      minimalDate.toString().substr(0, minimalDate.toString().indexOf('GMT')),
    );

    return moment(valueDate, 'ddd MMM DD YYYY HH:mm:ss');
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

  // postsFiltered: computed('posts', 'currentCategory', function() {
  //   let _this = this;
  //   if (!this.get('currentCategory')) {
  //     return this.get('posts');
  //   }
  //   return this.get('posts').filter(function(item) {
  //     if (item.get('category') == _this.get('currentCategory')) {
  //       return true;
  //     }
  //     return false;
  //   });
  // }),

  isFiltered: computed('toDate', 'fromDate', 'search', function() {
    return get(this, 'toDate') || get(this, 'fromDate') || get(this, 'search');
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
        moment.locale('en');
        const date = moment(
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
        moment.locale(_this.get('i18n.locale'));
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
        }
        // else {
        //   if (
        //     moment()
        //       .subtract(1, 'year')
        //       .diff(date, 'days') > 0
        //   ) {
        //     return false;
        //   }
        // }
        return true;
      });
    },
  ),

  postsOrdered: computed('postsFiltered', function() {
    return get(this, 'postsFiltered')
      .sortBy('date')
      .reverse();
  }),

  postsTrimmed: computed('postsFiltered', function() {
    return this.get('postsFiltered').slice(0, 8);
  }),

  articlesTrimmed: computed('articles', function() {
    return this.get('articles').slice(0, 2);
  }),

  articlesFull: computed('articles', function() {
    return this.get('articles').slice(2, this.get('articles.length'));
  }),

  actions: {
    setFilter: function(value) {
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
