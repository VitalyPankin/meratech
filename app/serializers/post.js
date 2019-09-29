import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const renamed = ({ rendered, ...object }) => ({ title: rendered, ...object });

    const posts = payload.map(item => {
      return {
        ...item,
        ...item.acf,
        ...renamed(item.title),
      };
    });

    const newPayload = { posts };

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },
});
