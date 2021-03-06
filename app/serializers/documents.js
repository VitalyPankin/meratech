import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      documents: payload.data,
    };

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
