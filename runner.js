 var forever = require('forever');
  
  var child = new (forever.Forever)('/www/codeofrob.com/helloWorld.js', {
  	 forever: true,
    silent: false,
    options: []
  });

	child.on('error', function(data){
		console.log(data);
	});
  
  child.start();
