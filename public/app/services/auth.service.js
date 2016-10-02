angular.module('authService', [])
	// login and get information
	.factory('Auth', function($http, $q, AuthToken) {
		var auth = {};

		// handle login
		auth.login = function(username, password) {
			return $http.post('/api/authenticate', {
				username: username,
				password: password
			})
			.success(function(data) {
				AuthToken.setToken(data.token);
				return data;
			});
		};

		// handle logout
		auth.logout = function() {
			// clear the token
			AuthToken.setToken();
		};

		// check if a user is logged in
		auth.isLoggedIn = function() {
			if (AuthToken.getToken()) {
				return true;
			} else {
				return false;
			}
		};

		// get the user info
		auth.getUser = function() {
			if (AuthToken.getToken()) {
				return $http.get('/api/me', { cache: true });
			} else {
				return $q.reject({ message: 'User has no token.' });
			}
		};

		return auth;
	})

	// handle tokens
	.factory('AuthToken', function($window) {
		var authToken = {};

		// get the token
		authToken.getToken = function() {
			return $window.localStorage.getItem('token');
		};

		// set or clear token
		// if token is passed, set token; if no token, clear it from local storage
		authToken.setToken = function(token) {
			if (token) {
				$window.localStorage.setItem('token', token);
			} else {
				$window.localStorage.removeItem('token');
			}
		};

		return authToken;
	})

	// app configuration to integrate token into requests
	.factory('AuthInterceptor', function($q, $location, AuthToken) {
		var interceptor = {};

		// attach the token to every request
		interceptor.request = function(config) {
			var token = AuthToken.getToken();

			if (token) {
				config.headers['x-access-token'] = token;
			}

			return config;
		};

		// redirect if token doesn't authenticate
		interceptor.responseError = function(response) {
			if (response.status == 403) {
				AuthToken.setToken();
				$location.path('/login');
			}

			return $q.reject(response);
		};

		return interceptor;
	});