import Helper from '@ember/component/helper';

export default Helper.extend({
  compute: function(params) {
    return Math.floor(params[0] + Math.random() * params[1]);
  },
});
