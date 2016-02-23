angular.module('app.joinGame', [])
.controller('JoinGameCtrl', function($scope, $rootScope, GameService) {
	$scope.games = [];
	$scope.$on('$ionicView.enter', function () {
		GameService.getAllGames(function(data){
			$scope.games = data;
		});
	});
	$scope.gameSelected = function(gameId){
		GameService.setPlayerInGame($rootScope.user.id, gameId);
	}
	
})