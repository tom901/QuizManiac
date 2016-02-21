angular.module('app.signup', [])
.controller('signupCtrl', function($scope, $rootScope,$state, UserService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
	$scope.userInput= {};
	$scope.submitLogin = function(){
		UserService.setUser($scope.userInput.userName);
	}

	$scope.isExpanded = false;
	$timeout(function() {
		ionicMaterialMotion.slideUp({
			selector: '.slide-up'
		});
	}, 300);

	$timeout(function() {
		ionicMaterialMotion.fadeSlideInRight({
			startVelocity: 3000
		});
	}, 700);
	ionicMaterialInk.displayEffect();
})
