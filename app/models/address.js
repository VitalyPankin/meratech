import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
	title: attr('string'),
	content: attr('string'),
	excerpt: attr('string'),
	slug: attr('string'),
	date: attr('date'),
	featured_media: attr('number'),
	format: attr(),
	tags: hasMany('tag', {async: true}),
	
	type: attr('string'),
	title_en: attr('string'),
	title_ru: attr('string'),
	address_en: attr('string'),
	address_ru: attr('string'),
	phone: attr('string'),
	phone_additive: attr('string'),
	email: attr('string'),
	google_maps: attr('string')
});