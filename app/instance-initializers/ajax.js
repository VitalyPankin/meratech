/* eslint-disable ember/no-jquery */
import { run } from '@ember/runloop';
import { get } from '@ember/object';
import $ from 'jquery';

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store'),
    host = store.adapterFor('application').get('host');

  run(function() {
    appInstance.set('ajaxCounters', 0);
  });

  var ajaxloaderElement = document.createElement('div');
  ajaxloaderElement.setAttribute('id', 'ajax-loader');
  ajaxloaderElement.setAttribute('class', 'loading-notify is-load');
  document.body.appendChild(ajaxloaderElement);

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      run(() => {
        if (appInstance.get('ajaxCounters') === 0 && !settings.noCounter) {
          // ajaxloaderElement.setAttribute('class', 'loading-notify is-load');
        }

        // do not set mask for buggy addthis widget, sometimes ajax callbacks do not work correct
        if (settings.url.indexOf(host) === 0) {
          appInstance.set('ajaxCounters', appInstance.get('ajaxCounters') + 1);
        }
      });
    },

    complete: function() {
      run(() => {
        var counter = get(appInstance, 'ajaxCounters') - 1;
        window.scrollTo(0, 0);
        counter = counter < 0 ? 0 : counter;
        appInstance.set('ajaxCounters', counter);
        if (appInstance.get('ajaxCounters') === 0) {
          if (window.top === window.self) {
            // ajaxloaderElement.setAttribute('class', 'loading-notify');
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
