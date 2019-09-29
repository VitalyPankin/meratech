/* eslint-disable ember/no-new-mixins */
import App from './app';
import Mixin from '@ember/object/mixin';

App.ResetScroll = Mixin.create({
  activate: function() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  },
});
