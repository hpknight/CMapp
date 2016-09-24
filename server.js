var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');

var app = express();

mongoose.connect('localhost:27017/sample');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

//
// BEGIN api routes
//
var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
	console.log('Somebody just came to our app');
	next();
});

apiRouter.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api!'});
});

app.use('/api', apiRouter);
//
// END api routes
//

app.listen(3000, function() {
	console.log('Listening on port 3000.');
});