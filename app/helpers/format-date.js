import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import moment from 'moment';

export default Helper.extend({
  i18n: service(),
  _locale: readOnly('i18n.locale'),

  compute: function(params) {
    moment.locale(this.get('_locale'));
    let now = moment();
    const valueDate = new Date(params.toString().substr(0, params.toString().indexOf('GMT')));
    let value = moment(valueDate, 'ddd MMM DD YYYY HH:mm:ss');
    const yearFormat = now.isSame(value, 'year') ? '' : ' YYYY';
    if (parseInt(now.diff(value, 'days', true)) > 14) {
      if (this.get('_locale') === 'en') {
        return value.format('MMMM D' + yearFormat);
      } else {
        return value.format('D MMMM' + yearFormat);
      }
    }

    return value.calendar();
  },
});
