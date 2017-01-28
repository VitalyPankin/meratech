import Ember from "ember";

export default Ember.Helper.extend({
  i18n: Ember.inject.service(),

  _locale: Ember.computed.readOnly('i18n.locale'),

  compute: function(params) {
  	let value = params[0];
    return value.toLocaleString(this.get('_locale')); 
  }
});