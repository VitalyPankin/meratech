import Ember from 'ember';

export default Ember.Controller.extend({
	currentPath: null,
	wat: "sfdasfawefre",
	isAboutRoute: false,
  updateCurrentPath: function() {
    this.set('currentPath', this.get('currentPath'));
    console.log(this.get('currentPath'));
    if(this.get('currentPath')=='about'){
	    this.set('isAboutRoute', true);
    }else{
	    this.set('isAboutRoute', false);
    }
  }.observes('currentPath'),
  
});
