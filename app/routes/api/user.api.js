var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../../config');

module.exports = function(app, express) {
	var userRoute = express.Router();

	userRoute.post('/authenticate', function(req, res) {
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {
			if (err) {
				throw err;
			}
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password'
					});
				} else {
					var token = jwt.sign({
						name: user.name,
						username: user.username
					}, config.secret, {expiresIn: 1800});
					// include expiration of token

					res.json({
						success: true,
						message: 'Enjoy your token',
						token: token
					});
				}
			}
		});
	});

	userRoute.use(function(req, res, next) {
		// flexible api - check for token in 3 different areas
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	});

	userRoute.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	userRoute.route('/users')
		.post(function(req, res) {
			var user = new User(req.body);

			user.save(function(err) {
				if (err) {
					if (err.code === 11000) {
						return res.json({
							success: false,
							message: 'A user with that username already exists.'
						});
					} else {
						res.send(err);
					}
				}

				res.json({ message: 'User created!' });
			});
		})
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}
				res.json(users);
			});
		});

	userRoute.route('/users/:user_id')
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.json(user);
			});
		})
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					res.send(err);
				}

				if (req.body.name) {
					user.name = req.body.name;
				}
				if (req.body.username) {
					user.username = req.body.username;
				}
				if (req.body.password) {
					user.password = req.body.password;
				}
				if (req.body.phoneNumber) {
					user.phoneNumber = req.body.phoneNumber;
				}

				user.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({ message: 'User updated!' });
				});
			});
		})
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) {
					return res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			});
		});

	return userRoute;
};