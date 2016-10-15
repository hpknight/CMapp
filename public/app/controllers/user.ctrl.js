angular.module('userCtrl', ['userService'])
	.controller('userController', function(User) {
		var vm = this;
		vm.processing = true;

		vm.getAllUsers = function() {
			User.all()
				.success(function(data) {
					vm.processing = false;
					vm.users = data;
				});
		};

		vm.deleteUser = function(id) {
			vm.processing = true;

			User.delete(id)
				.success(function(data) {
					// get all users to update the table
					vm.getAllUsers();
				});
		};

		vm.getAllUsers();
	})
	.controller('userCreateController', function(User) {
		var vm = this;

		vm.type = 'create';

		vm.saveUser = function() {
			vm.processing = true;
			vm.message = '';

			User.create(vm.userData)
				.success(function(data) {
					vm.processing = false;
					vm.userData = {};
					vm.message = data.message;
				});
		};
	})
	.controller('userEditController', function($routeParams, User, Todo) {
		var vm = this;

		vm.type = 'edit';

		User.get($routeParams.user_id)
			.success(function(data) {
				vm.userData = data;
			});

		vm.getTodos = function() {
			Todo.get($routeParams.user_id)
				.success(function(data) {
					vm.todoData = data;
				});
		};
		vm.getTodos();

		vm.saveUser = function() {
			vm.processing = true;
			vm.message = '';

			User.update($routeParams.user_id, vm.userData)
				.success(function(data) {
					vm.processing = false;
					vm.userData = {};
					vm.message = data.message;
				});
		};

		vm.addTodo = function() {
			vm.processing = true;

			vm.newTodo.userId = $routeParams.user_id;
			// console.log(vm.newTodo);

			Todo.create(vm.newTodo)
				.success(function(data) {
					vm.processing = false;
					vm.newTodo = {};
					vm.getTodos();
				});
		};

		vm.deleteTodo = function(e) {
			vm.processing = true;

			Todo.delete(e)
				.success(function(data) {
					vm.processing = true;
					vm.getTodos();
				});
		};
	});