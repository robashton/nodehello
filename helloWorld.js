var http = require('http');
var rss = require('./rob-rss');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text'});
	
	var parser = rss.parse(function(item){
		response.write(item.link);	
	});

		
	var blogClient = http.request({
			host: 'codeofrob.com',
			post: 80,
			method: 'GET',
			path: '/rss.aspx'
		},
		function(blogResponse) {
			blogResponse.on("data", function(chunk) {
				parser.parseString(chunk);
			});
			blogResponse.on("end", function() {
				response.end();
			});
	});

	blogClient.end();

	



}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
