import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [''],
  layoutName: 'components/slider-index',
  didInsertElement: function(){
    var tpj=jQuery;     
    var revapi68;
    tpj(document).ready(function() {
      if(tpj("#rev_slider_68_1").revolution === undefined){
        // revslider_showDoubleJqueryError("#rev_slider_68_1");
      }else{
        revapi68 = tpj("#rev_slider_68_1").show().revolution({
          sliderType:"hero",
          jsFileLocation:"assets/",
          sliderLayout:"fullwidth",
          dottedOverlay:"none",
          delay:9000,
          navigation: {
          },
          responsiveLevels: [1440, 1340, 753, 480],
          gridwidth:[1320,1024,778,480],
          gridheight:[768,768,897,720],
          lazyType:"none",
          parallax: {
            type:"mouse+scroll",
            origo:"slidercenter",
            speed:1000,
            levels:[-2,-1,15,0,0,0],
            disable_onmobile:"on"
          },
          shadow:0,
          spinner:"off",
          autoHeight:"off",
          disableProgressBar:"on",
          hideThumbsOnMobile:"off",
          hideSliderAtLimit:0,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          debugMode:false,
          fallbacks: {
            simplifyAll:"off",
            disableFocusListener:false,
          }
        });
      }
    }); /*ready*/
  }
});

