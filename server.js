var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

// app configuration
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our db
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// BEGIN api routes
var apiRoutes = require('./app/routes/api.js');
app.use('/api', apiRoutes);
// END api routes

// MAIN CATCHALL ROUTE
// send users to frontends
// has to be registered after api routes
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port, function() {
	console.log('Listening on port ' + config.port);
});