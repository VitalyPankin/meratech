/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/scroll-about';

export default Component.extend({
  tagName: 'section',
  classNames: ['about'],
  classNameBindings: ['isActive:active'],
  layout,

  backIsHidden: false,
  model: null,
  isRuLocale: null,

  backHidden: computed('backIsHidden', function() {
    return this.get('backIsHidden') ? 'hidden-back' : '';
  }),

  didInsertElement: function() {
    $('section.about').on('scroll', () => {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > 3400) {
        this.set('backIsHidden', true);
      } else {
        this.set('backIsHidden', false);
      }
    });
  },
});
