require('jquery');
require('backbone');

var CommentFormView = require('./comment_form_view.js')
var CommentsItemView = require('./comments_item_view.js')
var template = require('html!../templates/comments_list_template.html');

var CommentsView = Backbone.View.extend({
	initialize: function () {
		this.collection = new Backbone.Collection();
		this.childViews = [];

		this.form = new CommentFormView({
			collection: this.collection
		});
	},

	render: function () {
		this.$el.html(template);

		this.insertAddCommentForm();
		this.addEventListeners();
	},

	insertAddCommentForm: function () {
		this.form.render();
		this.$('div.comment-form-cnt').append(this.form.$el);
	},

	addEventListeners: function () {
		this.collection.on('add', this.renderComments.bind(this));
		this.collection.on('change:text', this.renderComments.bind(this));
	},

	renderComments: function () {
		var cnt = this.$('div.comments-list-cnt'),
			view;

		cnt.empty();
		this.childViews = [];

		this.collection.each(function (model) {
			view = new CommentsItemView({
				model: model
			});
			this.childViews.push(view);
			view.render();
			cnt.append(view.$el);
		}, this);
	}
});

module.exports = CommentsView;
