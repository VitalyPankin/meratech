import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
    }
  },

  model(params) {
    this.controllerFor('equipment.category.item').set('id', params.item_id);
    // eslint-disable-next-line no-unused-vars
    let item = params.item_id;
    let _equipmentModel = this.controllerFor('application').get('equipmentModel');
    let result = null;
    if (_equipmentModel) {
      result = _equipmentModel
        .filter(item => {
          if (params.item_id === item.get('slug')) {
            return true;
          }
          return false;
        })
        .get('firstObject');
    } else {
      _equipmentModel = this.get('store').query('item', { per_page: 500 });
      result = _equipmentModel.then(models =>
        models
          .filter(item => {
            if (params.item_id === item.get('slug')) {
              return true;
            }
            return false;
          })
          .get('firstObject'),
      );
      this.controllerFor('application').set('equipmentModel', _equipmentModel);
    }
    return result;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
