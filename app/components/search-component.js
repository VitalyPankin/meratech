import Component from '@ember/component';
import { translationMacro as t } from 'ember-i18n';
import layout from '../templates/components/search-component';

export default Component.extend({
  classNames: ['nav navbar-nav navbar-right search-component'],
  classNameBindings: ['isActive:active'],
  // layoutName: 'components/search-component',
  layout,
  isActive: false,
  isFocused: false,
  justFocusedOut: false,
  requestText: '',
  placeholderText: t('common.search'),

  actions: {
    makeSearch: function() {
      if (this.get('requestText')) {
        // do search
        // eslint-disable-next-line no-console
        console.log('PEW!');
      } else {
        if (!this.get('justFocusedOut')) {
          this.toggleProperty('isActive');
        }
        this.set('justFocusedOut', false);
      }
    },
  },
});
