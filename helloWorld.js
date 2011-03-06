var sys = require('sys'), http = require('http');
var fs = require('fs');
require('underscore');

// No idea why my server behaves differently here, I cba working it out
if(!_)
{
	var _ = require('underscore');
}


var mu = require('./mu');
var codeofrob = require("./codeofrob");

mu.templateRoot = './templates';
var cachedData = null;

var sources = [
	{
		getAllPosts: codeofrob.getAllPosts,
		getPost: codeofrob.getPost		
	}
];

var actions = [];


actions.push({
	path: "/",
	template: "index",
	generateData: function(callback)
		{
			if(cachedData == null)
			{
				var count = 0;
				var posts = [];
				for(i in sources)
				{
				   	sources[i].getAllPosts(function(newPosts){
						posts = posts.concat(newPosts);
						count++;
						if(count == sources.length){

							posts.sort(function(a, b){
								return b.pubDate - a.pubDate;
							});

							var model = {
								headline: posts.shift(),
								content: posts
							};

							model.headline.updateDescription(function(){
								cachedData = model;
								callback(model);
							});						
						}		
					});				
				}
			}
			else
			{
				callback(cachedData);
			}
		
		}
});


http.createServer(function (request, response) {

	var action = _(actions).chain().select(function(a) { return request.url == a.path }).first().value();
	if (_.isEmpty(action)) {

		if(request.url.indexOf("/css") == 0)
		{
			fs.readFile('.' + request.url, function(err, data) {		
				response.writeHead(200, {'Content-Type': 'text/css'});
				response.write(data);
				response.end();
			});
		}
		else
		{
			var proxyClient = http.request({
					host: 'codeofrob.com',
					post: 80,
					method: 'GET',
					path: request.url
				},
				function(proxyResponse) {
					response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
					proxyResponse.on("data", function(chunk) {
						response.write(chunk);
					});
					proxyResponse.on("end", function() {								
						response.end();
					});
			});
			proxyClient.end();

		}
	    } 
	else 
	{

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		
		action.generateData(function(data){
			console.log("Data has been generated");
	
			mu.render(action.template, data, { cached: false }, function(err, output){
					if(err) { throw err;}

					output.addListener('data', function(c) { 
						response.write(c); 
					}).addListener('end', function() { 
						response.end();
					});
				});
		});	
	}

}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
