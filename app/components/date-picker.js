/* eslint-disable no-redeclare */
/* eslint-disable ember/no-side-effects */
/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed, observer } from '@ember/object';
import moment from 'moment';
import layout from '../templates/components/date-picker';

// eslint-disable-next-line no-unused-vars
import { translationMacro as t } from 'ember-i18n';

export default Component.extend({
  i18n: service(),
  layout,
  from: null,
  to: null,
  direction: null,
  selectedYear: null,
  selectedMonth: null,
  selected: null,
  months: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ],

  init() {
    this._super(...arguments);
    if (this.get('direction') === 'to') {
      this.set('selectedYear', this.get('to').year());
      this.set('selectedMonth', this.get('months')[this.get('to').month()]);
    } else {
      this.set('selectedYear', this.get('from').year());
      this.set('selectedMonth', this.get('months')[this.get('from').month()]);
    }
  },

  selectedMonthHandler: observer('selectedYear', function() {
    let months = this.get('dateObject').find(item => {
      if (item.year === this.get('selectedYear')) {
        return true;
      }
    });

    if (!months.months.includes(this.get('selectedMonth'))) {
      if (this.get('direction') === 'to') {
        this.set('selectedMonth', months.months[months.months.length - 1]);
      } else {
        this.set('selectedMonth', months ? months.months[0] : null);
      }
    }
  }),

  displayMonths: computed('selectedYear', 'from', 'to', function() {
    let months = this.get('dateObject').find(item => {
      if (item.year === this.get('selectedYear')) {
        return true;
      }
    });

    return months.months;
  }),

  displaySelectedMonths: computed('selectedMonth', 'i18n.locale', function() {
    return this.get('i18n')
      .t(
        'common.months.' +
          this.get('selectedMonth')
            .toString()
            .toLowerCase(),
      )
      .toString()
      .substr(0, 3);
  }),

  dateObject: computed('from', 'to', function() {
    let result = [],
      // eslint-disable-next-line no-unused-vars
      direction = this.get('direction'),
      from = this.get('from'),
      to = this.get('to'),
      yearsDiff = Math.floor(to.year() - from.year()) + 1,
      monthsDiff = Math.floor(to.diff(from, 'months', true)) + 1;

      // eslint-disable-next-line no-console
      console.log('yearsDiff:' + yearsDiff + ' monthsDiff:' + monthsDiff);

    if (yearsDiff) {
      for (var i = 0; i < yearsDiff; i++) {
        let months = [];
        if (from.year() === from.year() + i) {
          //first year
          if (yearsDiff === 1) {
            for (var j = from.month(); j < from.month() + monthsDiff - 1; j++) {
              months.push(this.get('months')[j]);
            }
          } else {
            for (var j = from.month(); j < 12; j++) {
              months.push(this.get('months')[j]);
            }
          }
        } else if (to.year() === from.year() + i) {
          for (var j = 0; j < to.month() + 1; j++) {
            months.push(this.get('months')[j]);
          }
        } else {
          months = this.get('months');
        }
        result.push({
          year: from.year() + i,
          months: months,
        });
      }
    } else {
      let months = [];
      for (var i = 0; i < monthsDiff; i++) {
        months.push(this.get('months')[from.month() + i]);
      }
      result.push({
        year: from.year(),
        months: months,
      });
    }

    return result;
  }),

  // eslint-disable-next-line ember/no-observers
  updateSelected: observer('selectedMonth', 'selectedYear', function() {
    moment.locale('en');
    if (this.get('direction') === 'to') {
      this.set(
        'selected',
        moment(
          '01 ' + this.get('selectedMonth') + ' ' + this.get('selectedYear') + ' 23:59:59',
          'DD MMMM YYYY HH:mm:ss',
        ).endOf('month'),
      );
    } else {
      this.set(
        'selected',
        moment(
          '01 ' + this.get('selectedMonth') + ' ' + this.get('selectedYear') + ' 00:00:01',
          'DD MMMM YYYY HH:mm:ss',
        ),
      );
    }
    moment.locale(this.get('i18n.locale'));
  }),

  actions: {
    setYear: function(value) {
      this.set('selectedYear', value);
    },
    setMonth: function(value) {
      this.set('selectedMonth', value);
    },
  },
});
