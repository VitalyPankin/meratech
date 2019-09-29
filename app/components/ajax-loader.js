/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  isLoad: false,
  classNames: ['loading-notify'],
  classNameBindings: ['isLoad'],
});
