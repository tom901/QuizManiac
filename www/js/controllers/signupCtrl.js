angular.module('app.signup', [])
.controller('signupCtrl', function($scope, $rootScope,$state, UserService) {
	$scope.userInput= {};
	$scope.submitLogin = function(){
		UserService.setUser($scope.userInput.userName);
	}
})