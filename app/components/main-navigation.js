import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-navigation navbar navbar-default navbar-static-top'],
  layoutName: 'components/main-navigation',
  isActive: false/*,


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
