var rss = require('./rob-rss');
var http = require('http');
var jsdom = require("jsdom");


retrieveCategory = function(category, itemCallback, finishCallback)
{
	jsdom.env('http://internal.codeofrob.com/category/' + category + '.aspx', [
		'http://code.jquery.com/jquery-1.5.min.js'
	], function(errors, window) {
		var $ = window.$;

		$('div.post').each(function(){
			var post = $(this);
			var postHeader = post.find('div.title');
			var postInfo = post.find('div.info');
			var postModel = {
				link: postHeader.find('a').attr('href'),
				title: postHeader.find('a').text(),
				updateDescription: function(callback)
				{
					var model = this;
					jsdom.env('http://internal.codeofrob.com' + this.link, [
							'http://code.jquery.com/jquery-1.5.min.js'
						], function(errors, window) {
							var $ = window.$;
							model.description = $('div.post div.body p').eq(0).text();
							callback();

					});
				},
				description: '',
				pubDate: new Date(postInfo.find('a').eq(0).text())
			};		

			itemCallback(postModel);		
		});

		finishCallback();	
	});
}


exports.getAllPosts = function(callback)
{
	var posts = {};
	var calls = 0;

	for(var x = 1 ; x <= 14 ; x++)
	{
		retrieveCategory(x, 
		function(item) {
			posts[item.link] = item;
		},
		function(){
			calls++;
			if(calls == 14) {
				var postArray = [];
				for(var i in posts)
				{
					postArray.push(posts[i]);
				}
				callback(postArray);
			}	
		});
	}
}
