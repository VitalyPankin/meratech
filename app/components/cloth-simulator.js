import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/latest-news';

export default Component.extend({
  tagName: 'article',
  classNames: ['latest-news', 'clearfix'],
  // layoutName: 'components/latest-news',
  layout,
  posts: null,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  postsTrimmed: computed('posts', function() {
    return this.get('posts').slice(0, 4);
  }),

  didInsertElement() {
    // debugger;
  },
});
