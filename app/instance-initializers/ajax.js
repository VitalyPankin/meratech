import Ember from 'ember';

export function initialize(appInstance) {
      var store = appInstance.lookup('service:store'),
      host = store.adapterFor('application').get('host');

    Ember.run(function () {
      appInstance.set("ajaxCounters", 0);
    });


   
    var ajaxloader = Ember.Component.create({
      tagName: 'div',
      isLoad: false,
      classNames: ['loading-notify'],
      container: appInstance.container,
      classNameBindings: ['isLoad']
    });

    ajaxloader.appendTo('body');
    

    Ember.$.ajaxSetup({
      beforeSend: function (xhr, settings) {
        Ember.run(function () {
          if (appInstance.get("ajaxCounters") === 0 && !settings.noCounter) {
            ajaxloader.set('isLoad', true);
          }

          // do not set mask for buggy addthis widget, sometimes ajax callbacks do not work correct
          if (settings.url.indexOf(host) === 0) {
            appInstance.set("ajaxCounters", appInstance.get("ajaxCounters") + 1);
          }
        });
      },
      complete: function () {
        Ember.run(function () {
          var counter = appInstance.get("ajaxCounters") - 1;

          window.scrollTo(0,0);
          counter = counter < 0 ? 0 : counter;
          appInstance.set("ajaxCounters", counter);
          if (appInstance.get("ajaxCounters") === 0) {
            if(window.top === window.self) {
              ajaxloader.set('isLoad', false);
            }
          }
        });
      }
    });
  }



export default {
  name: 'ajax',
  after: 'ember-data',
  initialize
};
