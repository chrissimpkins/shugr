var cluster = require('cluster');

var numCPU = require('os').cpus().length;

if ( cluster.isMaster ){
	for ( var i=0; i <  numCPU; ++i ){
		cluster.fork();
	}
}
else {
	var express = require('express'),
	    check = require('validator').check,
	    sanitize = require('validator').sanitize,
	    request = require('request'),
	    port = process.env.PORT || 5000;

	var app = express();
	app.use(express.logger());
	app.use(express.compress()); //gzip compression
	app.use(express.bodyParser()); //parse post uploads

	app.use(express.static(__dirname + '/public'));

	app.use(express.limit('500kb'));  //limit uploads to 500kb

	/*-----------------------------------------------------------------------------------*/
	/*	##.    ROUTES
	/*-----------------------------------------------------------------------------------*/

	app.post('/api/gethtml', express.bodyParser(), function(req, res){
	if ( req.body.hstring ){
		//res.set('Access-Control-Allow-Origin', '*');
		//res.set('Access-Control-Allow-Headers', 'X-Requested-With');
		var thehtml = req.body.hstring;
		//sanitized_text = sanitize( thehtml ).escape(); // sanitize user entered text
		res.set('Content-Disposition', 'attachment; filename=index.html');
		res.type('text/html');
		res.send(thehtml);
	}
	else {
		res.send("Error: No code found!");
	}

	}); // end app.post

	/*-----------------------------------------------------------------------------------*/
	/*	##.	SERVER LISTEN SETTINGS
	/*-----------------------------------------------------------------------------------*/

	app.listen(port, function(){
		console.log("Listening on " + port);
	});

	/*-----------------------------------------------------------------------------------*/
	/*	##.	EXCEPTION CATCH-ALL (for uncaught exceptions)
	/*-----------------------------------------------------------------------------------*/

	//catch uncaught exceptions to prevent server shutdown
	process.on('uncaughtException', function(e) {
		console.log(e);
	});

} // end of the cluster.isMaster logic

/*-----------------------------------------------------------------------------------*/
/*	##.	GLOBALS
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*	##.	GLOBAL EXCEPTION CATCH-ALL (for uncaught exceptions)
/*-----------------------------------------------------------------------------------*/

//catch uncaught exceptions to prevent server shutdown
process.on('uncaughtException', function(e) {
	console.log(e);
});


