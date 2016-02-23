angular.module('app.waitTheOthers', [])
.controller('waitTheOthersCtrl', function($scope, $rootScope, $state, $stateParams, GameService, $timeout) {
	$scope.waitingText = "En attente des autres joueurs.";
	$rootScope.audio.pause();
	$rootScope.WaitingTheOther.play();
	$rootScope.WaitingTheOther.volume = 0.5;
	$rootScope.WaitingTheOther.loop = true;
	var refreshIntervalId = null;

	$scope.$on('$ionicView.enter', function () {
		refreshIntervalId = setInterval(function(){
			GameService.getGameByName($rootScope.game.name);
			if($rootScope.game.stateGame == 0){
				$rootScope.WaitingTheOther.pause();
				angular.element(document.querySelector('#hero-has-mask')).addClass("heroUp");
				angular.element(document.querySelector('#answerArea')).addClass("visibleUpElement");
				$scope.countdown();
			}
		}, 100);
	});
	$scope.$on('$ionicView.beforeLeave', function () {
        if(refreshIntervalId != null){
            clearInterval(refreshIntervalId);
            console.log('waitTheOthersCtrl : $ionicView.beforeLeave');
        }
    });

	//Adding initial value for counter
	//counter modelimiz için ilk değer atamasını yaptık.
	$scope.counter = 10;
	var stopped;

	//timeout function
	//1000 milliseconds = 1 second
	//Every second counts
	//Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.
	$scope.countdown = function() {
		$scope.waitingText = "Tenez vous prêts !"
		if ($scope.counter>0) {
			stopped = $timeout(function() {
				console.log($scope.counter);
				$scope.counter--;
				$scope.countdown();
			}, 1000);
		}else if ($scope.counter == 0) {
			$state.go('app.gameOnline');
		}
	};


	$scope.stop = function(){
		$timeout.cancel(stopped);

	}

});
