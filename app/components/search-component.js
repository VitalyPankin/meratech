import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({
  classNames: ['nav navbar-nav navbar-right search-component'],
  classNameBindings: ['isActive:active'],
  layoutName: 'components/search-component',
  isActive: false,
  isFocused: false,
  justFocusedOut: false,
  requestText: '',
  placeholderText: t("common.search"),



  actions: {
    makeSearch: function(){
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
});
