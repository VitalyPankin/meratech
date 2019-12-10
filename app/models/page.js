import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  excerpt: attr('string'),
  slug: attr('string'),
  date: attr('date'),
  featured_media: attr('number'),
  format: attr(),
  tags: hasMany('tag', { async: true }),

  content_en: attr('string'),
  content_ru: attr('string'),
  title_en: attr('string'),
  title_ru: attr('string'),
});
