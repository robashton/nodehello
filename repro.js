var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write("Okay – so recently I’ve started presenting a session to various groups involving the well known IOC container “StructureMap”", 'utf8');
	response.end();
}).listen(8080);
