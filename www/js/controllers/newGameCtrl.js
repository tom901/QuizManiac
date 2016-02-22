angular.module('app.newGame', [])
.controller('NewGameCtrl', function($scope, $rootScope, $stateParams, GameService) {
	$scope.gameInput = {};
	console.log('NewGameCtrl : $stateParams.gameType');
	console.log($stateParams.gameType);
	$scope.createGame = function(){
		GameService.createNewGame($rootScope.user.id,$scope.gameInput.name,$scope.gameInput.numberUser);
	}

})