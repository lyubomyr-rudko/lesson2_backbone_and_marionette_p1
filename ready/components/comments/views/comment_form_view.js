require('jquery')
require('backbone');

var template = require('html!../templates/comment_form_template.html');
var _ = require('lodash');
var moment = require('moment');
var CommentFormView = Backbone.View.extend({
	initialize: function () {
		this.model = new Backbone.Model();
	},

	render: function () {
		this.$el.html(template);

		this.addEventListeners();
	},

	addEventListeners: function () {
		this.$('textarea').on('change', this.serializeForm.bind(this));
		this.$('button').on('click', this.onCommentSubmit.bind(this));
	},

	serializeForm: function () {
		var textarea = this.$('textarea'),
			commentText = textarea.val();

		this.model.set('text', commentText);
		this.model.set('date', moment().format('MMMM Do YYYY, h:mm:ss a'));
	},

	resetForm: function () {
		var textarea = this.$('textarea');

		textarea.val('');
	},

	onCommentSubmit: function (e) {
		this.serializeForm();
		e.preventDefault();

		var validationRes = this.validateForm();

		if (validationRes.isValid) {
			this.collection.add(this.model.toJSON());
			this.resetForm();
		}
		
		this.showErrorMsgs(validationRes);
		
	},

	validateForm: function () {
		var res = {
			isValid: true,
			errors: []
		};

		if (!this.model.get('text')) {
			res.isValid = false;
			res.errors.push({
				message: 'Text is required',
				el: this.$('textarea')
			});
		}

		return res;
	},

	showErrorMsgs: function (validationRes) {
		var message = '';

		this.$('.invalid').removeClass('invalid');

		_.each(validationRes.errors, function (error) {
			error.el.addClass('invalid');
			message +=   '<li>' + error.message + '</li';
		});

		this.$('ul.errors').html(message);
	}
});

module.exports = CommentFormView;
