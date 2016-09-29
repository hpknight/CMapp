var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
// var User = require('./app/models/user');
// var jwt = require('jsonwebtoken');
// var superSecret = 'superSecret';
var path = require('path');

var app = express();

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

app.use(morgan('dev'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

//
// BEGIN api routes
//
var apiRoutes = require('./app/routes/api.js');
app.use('/api', apiRoutes);
//
// END api routes
//

app.listen(config.port, function() {
	console.log('Listening on port ' + config.port);
});