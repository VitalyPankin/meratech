import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
	articles: DS.hasMany('article')
});
