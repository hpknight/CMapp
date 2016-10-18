var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../../config');

module.exports = function(app, express) {
	var route = express.Router();

	route.put('/forgot', function(req, res) {
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {
			if (err) {
				throw err;
			}
			if (!user) {
				res.json({
					success: false,
					message: 'User not found'
				});
			} else if (user) {
				user.password = req.body.password;
				user.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({success:true,message: 'password updated'});
				});
			}
		});
	});

	return route;
};