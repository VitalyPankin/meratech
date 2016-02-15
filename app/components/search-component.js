import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['nav navbar-nav navbar-right search-component'],
  classNameBindings: ['isActive:active'],
  layoutName: 'components/search-component',
  isActive: false,
  isFocused: false,
  justFocusedOut: false,
  requestText: '',



  actions: {
    makeSearch: function(e){
      if(!!this.get('requestText')){
        // do search
        console.log('PEW!');
      }else{
        if(!this.get('justFocusedOut')){
          this.toggleProperty('isActive');
        }
        this.set('justFocusedOut', false);
      }
    }
  },

/*
  operationsByTagGroupedByAdress: function() {

    var arr = Ember.A();
    var phoneNumbers = this.get('operationsByTag');
    phoneNumbers.forEach(function(operation) {
      var path = operation.get('path');
      var soughtForElement = arr.findBy('path', path);
      if(soughtForElement){
        soughtForElement.operationList.pushObject(operation);
      }else{
        var operationList = Ember.A();
        operationList.pushObject(operation);
        arr.pushObject({
          path:path,
          operationList: operationList
        });
      }
    });
    return arr.sortBy('path');
  }.property('operationsByTag'),
*/

  // focusOut: function() {
  //   if(!this.get('isFocused')){
  //     if(!this.get('requestText')){
  //       this.set('isActive', false);
  //       // for check if makeSearch not clicked right after focusOut
  //       this.set('justFocusedOut', true);
  //     }
  //   }
  // }.observes('isFocused')
});
