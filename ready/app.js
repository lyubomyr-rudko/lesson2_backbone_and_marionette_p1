var $ = require('jquery');

var CommentsComponent = require('./components/comments/main.js');

$(function () {
	var c = new CommentsComponent({
		el: $('#comments_cnt')
	});

	c.render();
});
