import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr(),
  article: DS.attr('string', { defaultValue: 'company' }),
  body: DS.attr(),
  tags: DS.attr('string'),
  image: DS.attr()
});