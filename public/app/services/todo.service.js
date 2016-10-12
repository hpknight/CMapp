angular.module('todoService', [])
	.factory('Todo', function($http) {
		var todo = {};

		// get a single todo
		todo.get = function(id) {
			return $http.get('/api/users/' + id);
		};

		// get all todos
		todo.all = function() {
			return $http.get('/api/todo/');
		};

		// create a todo
		todo.create = function(userData) {
			return $http.post('/api/todo/', userData);
		};

		// update a todo
		todo.update = function(id, userData) {
			return $http.put('/api/todo/' + id, userData);
		};

		// delete a todo
		todo.delete = function(id) {
			return $http.delete('/api/todo/' + id);
		};

		return todo;
	});