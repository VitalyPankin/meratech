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
});
