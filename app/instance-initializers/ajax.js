/* eslint-disable ember/no-jquery */
// import Component from '@ember/component';
import { run } from '@ember/runloop';
import $ from 'jquery';

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store'),
    host = store.adapterFor('application').get('host');

  run(function() {
    appInstance.set('ajaxCounters', 0);
  });

  let ajaxloader = appInstance.lookup('service:ajax-loader');

  // let ajaxloader = Component.create({
  //   tagName: 'div',
  //   isLoad: false,
  //   classNames: ['loading-notify'],
  //   // container: appInstance.layout,
  //   // container: appInstance.container,
  //   renderer: appInstance.lookup('renderer:-dom'),
  //   classNameBindings: ['isLoad'],
  // });

  // ajaxloader.appendTo('body');

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      run(() => {
        if (appInstance.get('ajaxCounters') === 0 && !settings.noCounter) {
          ajaxloader.set('isLoad', true);
        }

        // do not set mask for buggy addthis widget, sometimes ajax callbacks do not work correct
        if (settings.url.indexOf(host) === 0) {
          appInstance.set('ajaxCounters', appInstance.get('ajaxCounters') + 1);
        }
      });
    },
    complete: function() {
      run(() => {
        var counter = appInstance.get('ajaxCounters') - 1;

        window.scrollTo(0, 0);
        counter = counter < 0 ? 0 : counter;
        appInstance.set('ajaxCounters', counter);
        if (appInstance.get('ajaxCounters') === 0) {
          if (window.top === window.self) {
            ajaxloader.set('isLoad', false);
          }
        }
      });
    },
  });
}

export default {
  name: 'ajax',
  after: 'ember-data',
  initialize,
};
