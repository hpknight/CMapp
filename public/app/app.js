angular.module('CMapp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userService', 'userCtrl'])
.config(function($httpProvider) {
	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});