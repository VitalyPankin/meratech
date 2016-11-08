import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['about'],
  classNameBindings: ['isActive:active'],
  layoutName: 'components/scroll-about',
  backIsHidden: false,

  didInsertElement: function(){
    var _this = this;
    Ember.$('section.about').on( 'scroll', function(e){
      var scrollTop = Ember.$(this).scrollTop();
      if(scrollTop>3400){
        _this.set('backIsHidden', true);
      } else {
        _this.set('backIsHidden', false);
      }
    });
  }
});
