import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend({
  i18n: service(),
  session: service('session'),
  post: null,

  isRuLocale: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'ru';
  }),

  readableDate: computed('i18n.locale', function() {
    moment.locale(this.get('i18n.locale'));

    let value = moment(
      this.get('post.date')
        .toString()
        .substr(
          0,
          this.get('post.date')
            .toString()
            .indexOf('GMT'),
        ),
      'ddd MMM DD YYYY HH:mm:ss',
    );

    return value.format('dddd, MMMM Do,  YYYY');
  }),

  actions: {},
});
