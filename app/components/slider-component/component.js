/* eslint-disable ember/no-jquery */
/* eslint-disable no-unused-vars */
import Component from '@ember/component'
import { computed } from '@ember/object'
import isMobile from 'ismobilejs'
import $ from 'jquery'

export default Component.extend({
  classNames: [''],
  slides: null,

  isMobile: computed(function() {
    return isMobile().phone
  }),

  preparedSlides: computed('slides', function() {
    return this.slides.sort(function(a, b) {
      return a.acf.priority - b.acf.priority
    })
  }),

  willDestroyElement() {
    $('#rev_slider_4_1').revkill()
  },

  didInsertElement() {
    this._super(...arguments)

    var tpj = $
    var revapi4

    tpj(document).ready(function() {
      if (tpj('#rev_slider_4_1').revolution === undefined) {
        // revslider_showDoubleJqueryError("#rev_slider_4_1");
      } else {
        revapi4 = tpj('#rev_slider_4_1')
          .show()
          .revolution({
            sliderType: 'standard',
            jsFileLocation: 'assets/',
            sliderLayout: 'fullwidth',
            dottedOverlay: 'none',
            delay: 9000,
            navigation: {
              keyboardNavigation: 'off',
              keyboard_direction: 'horizontal',
              mouseScrollNavigation: 'off',
              onHoverStop: 'off',
              touch: {
                touchenabled: 'on',
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: 'horizontal',
                drag_block_vertical: false,
              },
              arrows: {
                style: 'dione',
                enable: true,
                hide_onmobile: true,
                hide_under: 600,
                hide_onleave: true,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                left: {
                  h_align: 'left',
                  v_align: 'center',
                  h_offset: 0,
                  v_offset: 0,
                },
                right: {
                  h_align: 'right',
                  v_align: 'center',
                  h_offset: 0,
                  v_offset: 0,
                },
              },
            },
            viewPort: {
              enable: true,
              outof: 'pause',
              visible_area: '100%',
            },
            responsiveLevels: [1240, 1024, 753, 480],
            gridwidth: [980, 980, 778, 320],
            gridheight: [700, 600, 550, 450],
            lazyType: 'none',
            parallax: {
              type: 'mouse',
              origo: 'slidercenter',
              speed: 2000,
              levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: 'off',
            stopLoop: 'off',
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: 'off',
            autoHeight: 'off',
            hideThumbsOnMobile: 'off',
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
              simplifyAll: 'off',
              nextSlideOnWindowFocus: 'off',
              disableFocusListener: false,
            },
          })
      }
    }) /*ready*/
  },
})
