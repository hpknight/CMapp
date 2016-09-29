angular.module('CMapp', ['routerRoutes'])

// controller for entire app
.controller('mainCtrl', function() {
	var vm = this;
	vm.message = 'This is the main ctrl';
})

.controller('homeCtrl', function() {
	var vm = this;
	vm.message = 'This is the home page.';
})

.controller('aboutCtrl', function() {
	var vm = this;
	vm.message = 'This is the about page.';
})

.controller('contactCtrl', function() {
	var vm = this;
	vm.message = 'This is the contact page.';
});