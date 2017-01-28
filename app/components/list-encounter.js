import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-encounter'],
  layoutName: 'components/list-encounter',
  classNamesBindings: ['viewportEntered:active'],
  counter: null,
  didEnterViewport() {
    this.set('counter', this.get('counter')+1);
  },
  didLeaveViewport() {
    console.log('left');
  },
  didInsertElement(direction) {
    //Ember.$(this).
  },
  // elementInViewport: Ember.observer('enteredViewport', function() {
  //   this.set('counter', this.get('counter')+1);
  //   debugger;
  // }).on('didInsertElement'),
  // elementInViewport2: Ember.observer('didEnterViewport', function() {
  //   this.set('counter', this.get('counter')+1);
  //   debugger;
  // }).on('didInsertElement'),
  // elementInViewport3: Ember.observer('didLeaveViewport', function() {
  //   this.set('counter', this.get('counter')+1);
  //   debugger;
  // }).on('didInsertElement'),
});
