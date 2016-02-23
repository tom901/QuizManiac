angular.module('app.signup', [])
.controller('signupCtrl', function($scope, $state, $ionicPopup,$rootScope,$state, UserService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
	$scope.userInput= {};
	$scope.submitLogin = function(){
		if($scope.userInput.userName != "" && $scope.userInput.userName != undefined){
			$rootScope.popDrip.play();
			UserService.setUser($scope.userInput.userName);
			$state.go('app.newOrJoinGame');
		}else {
			$ionicPopup.alert({
				title: 'Donnez un pseudo',
				template: 'Tu ne peux pas jouer sans pseudo'
			});
			$rootScope.jar_deny.play();
			return false;
		}
	}
	$scope.isExpanded = false;
	$timeout(function() {
		$rootScope.shortWhooshSound.play();
		ionicMaterialMotion.slideUp({
			selector: '.slide-up'
		});
		$rootScope.pad_confirm.volume = 0.5;
		$rootScope.pad_confirm.play();
	}, 300);

	$timeout(function() {
		ionicMaterialMotion.fadeSlideInRight({
			startVelocity: 3000
		});
	}, 700);
	ionicMaterialInk.displayEffect();
})
