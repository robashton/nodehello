var http = require('http');
var xml = require('./node-xml');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text'});
	 

                                var parser = new xml.SaxParser(function(cb){
                                        cb.onStartDocument(function(){
                                        });
                                        cb.onEndDocument(function(){
					});
					var isLink = false;
					cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
						switch(elem){
							case 'link':
								isLink = true;
								break;
							default:
								isLink = false;
								break;
						}					
					});
					cb.onCharacters(function(chars){
						if(isLink){
							response.write(chars);
							response.write('\r\n');
						}
					});
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
