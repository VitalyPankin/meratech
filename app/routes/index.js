import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let _postsModel = this.controllerFor('application').get('postsModel');
    if (_postsModel) {
      // ?
    } else {
      _postsModel = this.get('store').query('post', { per_page: 500 });
      this.controllerFor('application').set('postsModel', _postsModel);
    }
    return _postsModel;
  },

  setupController: function() {
    this._super(...arguments);
  },
});
