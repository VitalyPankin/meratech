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
	
	articles: attr('string'),
	advantages_en: attr('string'),
	advantages_ru: attr('string'),
	category: attr(),
	complectation_en: attr('string'),
	complectation_ru: attr('string'),
	description_en: attr('string'),
	description_ru: attr('string'),
	image: attr('string'),
	options_en: attr('string'),
	options_ru: attr('string'),
	specs_en: attr('string'),
	specs_ru: attr('string'),
	type: attr()
});