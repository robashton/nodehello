var sys = require('sys'), http = require('http');
var fs = require('fs');
require('underscore');

var mu = require('./mu');
var codeofrob = require("./codeofrob");

mu.templateRoot = './templates';

var cachedData = null;
var cacheDate = null;
var updating = false;

var sources = [
	{
		getAllPosts: codeofrob.getAllPosts,
		getPost: codeofrob.getPost		
	}
];

var actions = [];

updateCachedData = function(callback)
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
					cacheDate = new Date();
					console.log(cacheDate);
					callback(model);
					
				});						
			}		
		});				
	}
};


actions.push({
	path: "/",
	template: "index",
	generateData: function(callback)
		{
			if(cachedData == null)
			{
				updateCachedData(callback);
			}
			else
			{
				callback(cachedData);
				var timeElapsed = new Date() - cacheDate;
				if(timeElapsed > 1000 * 5 && !updating)
				{
					updating = true;
					console.log("Flushing cache");
					updateCachedData(function(model){
						console.log("Re-loaded cache");		
						updating = false;		
					});
					
				}
			}
		
		}
});

do404 = function(response){
	response.writeHead(404, { 'Content-Type': 'text/html'});
	response.write("Sorry, this is not the page you were looking for :(");
	response.end();	
};

http.createServer(function (request, response) {

    var action = _(actions).chain().select(function (a) { return request.url == a.path }).first().value();
    if (_.isEmpty(action)) {

        if (request.url.indexOf("/css") == 0) {
            fs.readFile('.' + request.url, function (err, data) {
                if (err) { do404(response); return; }
                response.writeHead(200, { 'Content-Type': 'text/css' });
                response.write(data);
                response.end();
            });
        }
        else if (request.url.indexOf("/img") == 0) {
            fs.readFile('.' + request.url, function (err, data) {
                if (err) { do404(response); return; }
                response.writeHead(200, { 'Content-Type': 'Image/jpeg' });
                response.write(data, 'binary');
                response.end();
            });

        }
        else if (request.url.indexOf("/rss") == 0) {
            console.log("Intercepted RSS request");
            var rssData = '';
            var proxyClient = http.request({
                host: 'internal.codeofrob.com',
                post: 80,
                method: 'GET',
                path: "/Rss.aspx"
            },
			function (proxyResponse) {
			    proxyResponse.on("data", function (chunk) {
			        rssData += chunk.toString().replace("internal\.codeofrob", "codeofrob");
			    });
			    proxyResponse.on("end", function () {
			        response.writeHead(200, { 'Content-Type': 'text/xml' });
			        response.write(rssData);
			        response.end();
			    });
			});
            proxyClient.end();
        }
        else {
            console.log('Proxying ' + request.method + ' to ' + request.url);
            var proxyClient = http.request({
                host: 'internal.codeofrob.com',
                post: 80,
                method: request.method,
                path: request.url
            },
				function (proxyResponse) {
				    response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
				    proxyResponse.on("data", function (chunk) {
				        response.write(chunk);
				    });
				    proxyResponse.on("end", function () {
				        response.end();
				    });
				});


            for (i in request.headers) {
                if (i == 'host') { continue; }
                proxyClient.setHeader(i, request.headers[i]);
            }

            request.on('data', function (data) {
                proxyClient.write(data);
            });

            request.on('end', function () {
                proxyClient.end();
            });

        }
    }
    else {

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        action.generateData(function (data) {
            console.log("Data has been generated");

            mu.render(action.template, data, { cached: false }, function (err, output) {
                if (err) { throw err; }

                output.addListener('data', function (c) {
                    response.write(c);
                }).addListener('end', function () {
                    response.end();
                });
            });
        });
    }

}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
