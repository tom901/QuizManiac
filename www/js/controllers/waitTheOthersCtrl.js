angular.module('app.waitTheOthers', [])
.controller('waitTheOthersCtrl', function($scope, $rootScope, $state, $stateParams, GameService) {
	$rootScope.audio.pause();
	$rootScope.WaitingTheOther.play();
	$rootScope.WaitingTheOther.volume = 0.2;
	$rootScope.WaitingTheOther.loop = true;
	
	var refreshIntervalId = null;

	$scope.$on('$ionicView.enter', function () {
		refreshIntervalId = setInterval(function(){
			GameService.getGameByName($rootScope.game.name);
			if($rootScope.game.stateGame == 0){
				alert('Le jeu va commencer');
				// clearInterval(refreshIntervalId);
				$rootScope.WaitingTheOther.pause();
				$state.go('app.gameOnline');
			}
		}, 100);
	});
	$scope.$on('$ionicView.beforeLeave', function () {
        if(refreshIntervalId != null){
            clearInterval(refreshIntervalId);
            console.log('waitTheOthersCtrl : $ionicView.beforeLeave');
        }
    });

})
