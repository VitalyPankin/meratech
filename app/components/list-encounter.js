/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Component from '@ember/component';
import layout from '../templates/components/list-encounter';

export default Component.extend({
  classNames: ['list-encounter'],
  layout,
  classNamesBindings: ['viewportEntered:active'],

  counter: null,

  didEnterViewport() {
    this.set('counter', this.get('counter') + 1);
  },
});
