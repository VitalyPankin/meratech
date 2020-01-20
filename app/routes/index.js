import Route from '@ember/routing/route'
import fetch from 'fetch'
import RSVP from 'rsvp'

export default Route.extend({
  model() {
    let _postsModel = this.controllerFor('application').get('postsModel')
    if (_postsModel) {
      // ?
    } else {
      _postsModel = this.get('store').query('post', { per_page: 500 })
      this.controllerFor('application').set('postsModel', _postsModel)
    }

    return RSVP.hash({
      posts: _postsModel,
      slides: fetch('http://api.meratech.ru//wp-json/wp/v2/slider_photos').then(
        function(response) {
          return response.json()
        },
      ),
    })
  },

  setupController: function() {
    this._super(...arguments)
  },
})
