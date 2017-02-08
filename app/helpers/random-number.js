import Ember from "ember";

export default Ember.Helper.extend({

  compute: function(params) {
  	return Math.floor(params[0]+Math.random() * params[1]);
  }
});