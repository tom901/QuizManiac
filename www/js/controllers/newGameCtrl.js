angular.module('app.newGame', [])
.controller('NewGameCtrl', function($ionicPopup, $scope, $rootScope, $state, $stateParams, GameService) {
	$scope.gameInput = {};
	console.log('NewGameCtrl : $stateParams.gameType');
	console.log($stateParams.gameType);
	$scope.createGame = function(){
		if($scope.gameInput.name == "" || $scope.gameInput.name == undefined){
			$ionicPopup.alert({
				title: 'Donnez un nom',
				template: 'Donnez un nom à la partie pour  pouvoir jouer'
			});
			$rootScope.jar_deny.play();
			return false;
		}else if ($scope.gameInput.numberUser == "" || $scope.gameInput.numberUser == undefined || $scope.gameInput.numberUser < 2) {
			$ionicPopup.alert({
				title: 'Nombre de joueurs insufisant',
				template: 'Il faut 2joueurs minimum dans la partie !r'
			});
			$rootScope.jar_deny.play();
			return false;
		}else {
			GameService.createNewGame($rootScope.user.id,$scope.gameInput.name,$scope.gameInput.numberUser, $stateParams.gameType);
			$state.go("app.waitTheOthers");
			$rootScope.popDrip.play();
			$rootScope.chime_bell_ding.play();
		}
	}

})
