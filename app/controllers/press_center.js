import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  searchField: '',
  currentCategory: null,
  articlesActive: false,
  confirmedValue: '',

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

  postsFiltered: computed('posts', 'currentCategory', function() {
    let _this = this;
    if (!this.get('currentCategory')) {
      return this.get('posts');
    }
    return this.get('posts').filter(function(item) {
      if (item.get('category') == _this.get('currentCategory')) {
        return true;
      }
      return false;
    });
  }),

  postsTrimmed: computed('postsFiltered', function() {
    return this.get('postsFiltered').slice(0, 4);
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
