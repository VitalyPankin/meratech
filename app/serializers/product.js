import DS from 'ember-data';

const { RESTSerializer } = DS;

export default RESTSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const renamed = ({ rendered, ...object }) => ({ title: rendered, ...object });

    const products = payload.map(item => {
      return {
        ...item,
        ...item.acf,
        ...renamed(item.title),
      };
    });

    let newPayload = { products };

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },
});
