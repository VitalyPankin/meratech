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

  image: attr('string'),
  title_en: attr('string'),
  title_ru: attr('string'),
  subtitle_ru: attr('string'),
  subtitle_en: attr('string'),
  category: attr(),
  multitable: attr('boolean'),
  category_mobile: attr(),
  category_accessory: attr(),
  category_stationary: attr(),
  articles: attr(),
  advantages_en: attr('string'),
  advantages_ru: attr('string'),
  complectation_en: attr('string'),
  complectation_ru: attr('string'),
  description_en: attr('string'),
  description_ru: attr('string'),
  options_en: attr('string'),
  options_ru: attr('string'),
  specs_en: attr('string'),
  specs_ru: attr('string'),
});
