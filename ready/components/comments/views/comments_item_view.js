require('jquery')
require('backbone');

var _ = require('lodash');
var moment = require('moment');
var Handlebars = require('handlebars');
var template = Handlebars.compile(require('html!../templates/comments_item_template.html'));

var CommentsItemView = Backbone.View.extend({
	render: function () {
		var data = this.model.toJSON();

		this.$el.html(template(data));
	}
});

module.exports = CommentsItemView;


