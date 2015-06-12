'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.server.controller'),
    _ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

exports.upload = function(req, res) {
    console.log(req.files);
    res.send(req.files.file.name);
};
