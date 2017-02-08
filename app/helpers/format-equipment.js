import Ember from "ember";

export default Ember.Helper.extend({
  i18n: Ember.inject.service(),

  _locale: Ember.computed.readOnly('i18n.locale'),

  compute: function(title) {
  	let _title = title.toString();
		if(_title.substr(0, _title.indexOf(' '))){
	    if(_title.toLowerCase().indexOf('merafoam')+1){
	      return _title.substr(0, _title.indexOf(' '))+'<sup>®</sup> <b>'+_title.substr(_title.indexOf(' ')+1)+'</b>';  
	    }
	    if(_title.toLowerCase().indexOf('hygitech')+1){
	      return _title.substr(0, _title.indexOf(' '))+'<sup>®</sup> <b>'+_title.substr(_title.indexOf(' ')+1)+'</b>';  
	    }
	  }
	  return _title;
  }
});