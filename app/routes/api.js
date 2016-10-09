module.exports = function(app, express) {
	var apiRouter = express.Router();

	var userApi = require('./api/user.api')(app, express);
	apiRouter.use(userApi);

	return apiRouter;
};

