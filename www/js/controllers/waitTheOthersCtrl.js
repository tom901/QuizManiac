angular.module('app.waitTheOthers', [])
.controller('waitTheOthersCtrl', function($scope, $rootScope, $state, GameService) {
	console.log('waitTheOthersCtrl : $rootscope.game');
	console.log($rootScope.game);
	
	var refreshIntervalId = setInterval(function(){ 
		GameService.getGameByName($rootScope.game.name);
		if($rootScope.game.stateGame == 0){
			alert('Le jeu va commencer');
			clearInterval(refreshIntervalId);
			$state.go('app.gameOnline');
		}
	}, 100);

/* later */
})