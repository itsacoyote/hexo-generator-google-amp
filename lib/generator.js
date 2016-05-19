'use strict';

var _ = require('underscore');
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment();
var pathFn = require('path');
var fs = require('fs');

nunjucks.configure({
    autoescape: false,
    watch: false
});

env.addFilter('uriencode', function (str) {
    return encodeURI(str);
});

module.exports = function (locals) {
    var self = this;

    var ampTmplSrc = pathFn.join(__dirname, '/amp-template.html');
    var ampTmpl = nunjucks.compile(fs.readFileSync(ampTmplSrc, 'utf-8'), env);
    var image_url = "http://images.itsacoyoteworkshop.com/posts/";

    function createAmpPosts(posts, config) {
        var result = [];

        _.each(posts.toArray(), function (post) {
            var dates = {
                postDate: new Date(post.date),
                updateDate: new Date(post.updated)
            };

            var postURL = config.url + '/' + post.path;

            var ampPost = ampTmpl.render({
                post: post,
                config: config,
                postDates: dates,
                image_url: image_url,
                postURL: postURL
            });

            result.push({
                path: post.path + post.slug + '.amp.html',
                data: ampPost
            });
        });

        return result;
    }

    var allPosts = locals.posts.sort('-date');
    if (!allPosts.length) return;

    var result = createAmpPosts(allPosts, this.config);

    return result;
};