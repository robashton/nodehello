var rss = require('./rob-rss');
var http = require('http');
var jsdom = require("jsdom");

translateItem = function(item){
	var model = {
		link: item.link,
		pubDate: item.pubDate,
		description: item.description,
		title: item.title		
	};	
	return model;
}


exports.getAllPosts = function(callback)
{
	var posts = [];

	var parser = rss.parse(function(item){
				var converted = translateItem(item);
				posts.push(converted);		
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
				callback(posts);					
			});
	});
	blogClient.end();
}		
