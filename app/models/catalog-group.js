import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  title: DS.attr(),
  catalogGroups: DS.hasMany('soft-product')
});