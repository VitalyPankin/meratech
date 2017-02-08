import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-encounter'],
  layoutName: 'components/list-encounter',
  classNamesBindings: ['viewportEntered:active'],
  counter: null,
  didEnterViewport() {
    this.set('counter', this.get('counter')+1);
  },
});
