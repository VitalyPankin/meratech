import Ember from "ember";

export default Ember.Helper.extend({
  i18n: Ember.inject.service(),

  _locale: Ember.computed.readOnly('i18n.locale'),

  compute: function(params) {
    moment.locale(this.get('_locale'));
    let now = moment();
  	let value = moment(params.toString().substr(0, params.toString().indexOf('GMT')), 'ddd MMM DD YYYY HH:mm:ss');
  	if(parseInt(now.diff(value, 'days', true)) > 14){
  		if(this.get('_locale')==='en'){
  			return value.format("MMMM Do");
  		}else{
  			return value.format("Do MMMM");
  		}
  	}
  	return value.calendar();
  }
});