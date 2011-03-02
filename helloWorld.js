var http = require('http');
var rss = require('./node-rss');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text'});


	var feed_url = 'http://codeofrob.com/rss.aspx';

	rss.parseURL(feed_url, function(articles) {
		for(i = 0 ; i < articles.length; i++){
			response.write(articles[i].link);
		}
	});	

  
	 	
	var blogClient = http.request({
			host: 'codeofrob.com',
			post: 80,
			method: 'GET',
			path: '/rss.aspx'
		},
		function(blogResponse) {
			blogResponse.on("data", function(chunk) {
				response.write(chunk);
			});
			blogResponse.on("end", function() {
				response.end();
		
			});
	});

	blogClient.end();

	



}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
