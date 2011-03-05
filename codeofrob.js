var rss = require('./rob-rss');
var http = require('http');
var jsdom = require("jsdom");


translateItem = function(item){
	return item;
}


exports.getAllPosts = function(callback)
{
	var posts = [];

	var parser = rss.parse(function(item){
		posts.push(translateItem(item));		
		});

	var blogClient = http.request({
			host: 'codeofrob.com',
			post: 80,
			method: 'GET',
			path: '/rss.aspx'
		},
		function(blogResponse) {
			blogResponse.setEncoding('utf8');

			
			blogResponse.on("data", function(chunk) {
				parser.parseString(chunk);
			});
			blogResponse.on("end", function() {	

				jsdom.env(topPost.description, [
				  'http://code.jquery.com/jquery-1.5.min.js'
				], function(errors, window) {
					var firstParagraph = window.$('p').eq(0);

					topPost.description = firstParagraph.text();
					callback({
						headline: topPost,
						content: posts
						});
					});							
				
			});
	});
	blogClient.end();
}
