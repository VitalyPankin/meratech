import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const renamed = ({ rendered, ...object }) => ({ title: rendered, ...object });

    const articles = payload.map(item => {
      return {
        ...item,
        ...item.acf,
        ...renamed(item.title),
      };
    });

    const newPayload = { articles };

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },
});
