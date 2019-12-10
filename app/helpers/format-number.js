import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { typeOf } from '@ember/utils';

export default Helper.extend({
  i18n: service(),

  _locale: readOnly('i18n.locale'),

  compute: function(params) {
    let value = params[0];
    let res = '';
    if (typeOf(value) === 'number') {
      res = value.toLocaleString(this.get('_locale'));
    }

    return res;
  },
});
