import Ember from 'ember';

export default Ember.Controller.extend({
  searchField: '',
  isSearchOn: false,
  isSomething: false,
  confirmedValue: '',
  actions: {
    search: function() {
      var searchField = this.get('searchField');
      if(searchField=="merafoam"){
      	this.set('isSomething',true);
      }else{
      	this.set('isSomething',false);
      }
      this.set('isSearchOn',true);
      this.set('confirmedValue',this.get('searchField'));
    }
  }
});
