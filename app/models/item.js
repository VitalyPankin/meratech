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
	
	category: attr(),
	image: attr('string'),
	file_image_ru: attr('string'),
	file_image_en: attr('string'),
	title_en: attr('string'),
	title_ru: attr('string'),
	preview_en: attr('string'),
	preview_ru: attr('string'),
	description_en: attr('string'),
	description_ru: attr('string'),
	file_en: attr('string'),
	file_ru: attr('string')
});