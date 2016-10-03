angular.module('userService', [])
	.factory('User', function($http) {
		var user = {};

		// get a single user
		user.get = function(id) {
			return $http.get('/api/users/' + id);
		};

		// get all users
		user.all = function() {
			return $http.get('/api/users/');
		};

		// create a user
		user.create = function(userData) {
			return $http.post('/api/users/', userData);
		};

		// update a user
		user.update = function(id, userData) {
			return $http.put('/api/users/' + id, userData);
		};

		// delete a user
		user.delete = function(id) {
			return $http.delete('/api/users/' + id);
		};

		return user;
	});