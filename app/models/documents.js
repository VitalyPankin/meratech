import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
	documents: DS.hasMany('document')
});