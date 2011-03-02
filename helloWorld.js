var http = require('http');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text/xml'});

	 	
	var blogClient = http.createClient(80, 'feeds.feedburner.com');
	var blogRequest = blogClient.request("GET", "/RobAshton?format=xml");
	blogRequest.end();

	console.log('Making the request');

	blogRequest.on("response", function(blogResponse) {
		console.log('Got the response, listening for data');

		blogResponse.on("data", function(chunk) {
			console.log('Writing a chunk');
			response.write(chunk);
		});

		blogResponse.on("end", function() {
			console.log('Ending the response');
			response.end();
		
		});
	});

	



}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');