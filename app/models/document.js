import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  excerpt: attr('string'),
  slug: attr('string'),
  date: attr('date'),
  featured_media: attr('number'),
  format: attr(),
  tags: attr('string'),

  file: attr('string'),
  image: attr('string'),
  type: attr('string'),
  description_en: attr('string'),
  description_ru: attr('string'),
  main_industry_catalog: attr('string'),
  industry: attr('string'),
  title_en: attr('string'),
  title_ru: attr('string'),
});
