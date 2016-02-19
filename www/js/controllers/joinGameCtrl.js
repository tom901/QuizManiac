angular.module('app.joinGame', [])
.controller('JoinGameCtrl', function($scope, $rootScope, GameService) {
	$scope.games = [];
	GameService.getAllGames(function(data){
		$scope.games = data;
	});

	$scope.gameSelected = function(gameId){
		GameService.setPlayerInGame($rootScope.user.id, gameId);
	}
	
})