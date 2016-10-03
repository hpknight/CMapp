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
	});