angular.module('mainCtrl', [])
	.controller('mainCtrl', function($rootScope, $location, Auth) {
		var vm = this;

		// get info if a person is logged in
		vm.loggedIn = Auth.isLoggedIn();

		// check to see if a user is logged in on every request
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();

			// get user information on route change
			Auth.getUser()
				.then(function(data) {
					if (data) {
						vm.user = data;
					}
				})
				.catch(function(err) {
					// console.log(err);
				});
		});

		// function to handle login form
		vm.doLogin = function() {
			vm.processing = true;

			// call the Auth.login() function
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;
					$location.path('/users');
				});
		};

		// function to handle logging out
		vm.doLogout = function() {
			// call the Auth.login() function
			Auth.logout();
			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	});






