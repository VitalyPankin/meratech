import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['nav navbar-nav navbar-right search-component'],
  classNameBindings: ['isActive:active'],
  layoutName: 'components/search-block',
  isActive: false,



  actions: {
    makeSearch: function(e){
      this.toggleProperty('isActive');
    },
    focusOut: function(e){
      console.log('focusOut');
    }
  }

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


  operationsByTag: function() {
    return this.get('swagger').getOperationsByTag(this.get('tag.name'));
  }.property('tag', 'filter', 'session.currentOperationId')*/
});
