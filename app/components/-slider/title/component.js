import Component from '@ember/component'
import { computed } from '@ember/object'
import { getJustify } from '../../../utils/slider-utils'

export default Component.extend({
  tagName: '',

  title_1: null,
  title_2: null,
  justify: null,

  dataX: computed('justify', function() {
    return getJustify(this.justify)
  }),

  didInsertElement() {
    this._super(...arguments)
  },
})
