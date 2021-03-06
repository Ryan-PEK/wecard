'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller'),
	upload = require('../../app/controllers/upload.server.controller');

module.exports = function(app) {

	// Article Routes
	app.route('/articles/upload')
		.post(upload.upload);

	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(articles.create);
		//.post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(articles.update)
		.delete(articles.delete);
		//.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		//.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
