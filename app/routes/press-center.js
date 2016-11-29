import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		// return this.store.findAll('post');

		// By default the WP-API returns a maximum of 10 items.
		// To get more we can set the `per_page` query.
		debugger;
		return this.store.query('post', {per_page: 99});
	}
});
