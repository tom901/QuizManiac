angular.module('app.waitTheOthers', [])
.controller('waitTheOthersCtrl', function($scope, $rootScope, $state, GameService) {

	//$rootScope.audioTexte = "Son ";
	//$rootScope.audioIcon = "ion-volume-high";
	$rootScope.audio.pause();
	$rootScope.WaitingTheOther.play();
	$rootScope.WaitingTheOther.volume = 0.2;
	$rootScope.WaitingTheOther.loop = true;
	var refreshIntervalId = setInterval(function(){
		GameService.getGameByName($rootScope.game.name);
		if($rootScope.game.stateGame == 0){
			//alert('Le jeu va commencer');
			clearInterval(refreshIntervalId);
			$state.go('app.gameOnline');
		}
	}, 1000);

/* later */
})
