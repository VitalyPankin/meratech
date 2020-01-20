import Component from '@ember/component'
import { computed } from '@ember/object'
import { getJustify } from '../../../utils/slider-utils'

export default Component.extend({
  tagName: '',

  justify: null,
  isMobile: false,

  description_1: null,
  description_2: null,

  description: computed('description_1', 'description_2', function() {
    return `${this.description_1} ${this.description_2}`
  }),

  dataX: computed('justify', function() {
    return getJustify(this.justify)
  }),

  didInsertElement() {
    this._super(...arguments)
  },
})
