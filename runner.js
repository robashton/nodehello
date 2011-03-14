 var forever = require('forever');
  
  var child = new (forever.Forever)('helloWorld.js', {
  	 forever: true,
    silent: false,
    options: []
  });
  
  child.start();
