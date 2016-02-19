angular.module('app.newGame', [])
.controller('NewGameCtrl', function($scope, $rootScope, GameService) {
	$scope.gameInput = {};

	$scope.createGame = function(){
		console.log('game before create : ');
		console.log($scope.gameInput.name);
		console.log($scope.gameInput.numberUser);
		console.log($rootScope.user);
		GameService.createNewGame($rootScope.user.id,$scope.gameInput.name,$scope.gameInput.numberUser);

	}
})