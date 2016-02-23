angular.module('app.waitTheOthers', [])
.controller('waitTheOthersCtrl', function($scope, $rootScope, $state, $stateParams, GameService, $timeout) {
	
	$rootScope.audio.pause();
	$rootScope.WaitingTheOther.play();
	$rootScope.WaitingTheOther.volume = 0.5;
	$rootScope.WaitingTheOther.loop = true;
	var refreshIntervalId = null;

	$scope.nbCall = 0;

	$scope.$on('$ionicView.enter', function () {
		$scope.waitingText = "En attente des autres joueurs.";
		$scope.nbCall = 0;
		$scope.counter = 10;
		refreshIntervalId = setInterval(function(){
			GameService.getGameByName($rootScope.game.name);
			if($rootScope.game.stateGame == 0){
				$rootScope.WaitingTheOther.pause();
				if ($scope.nbCall == 0 ) {
					$scope.countdown();
					$scope.nbCall++;
				}
			}
		}, 100);
	});
	$scope.$on('$ionicView.beforeLeave', function () {
		// angular.element(document.querySelector('#hero-has-mask')).removeClass("heroUp");
		// angular.element(document.querySelector('#answerArea')).removeClass("visibleUpElement");
        if(refreshIntervalId != null){
            clearInterval(refreshIntervalId);
            console.log('waitTheOthersCtrl : $ionicView.beforeLeave');
            $scope.nbCall = 0;
            $scope.counter = 10;
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
		if ($scope.nbCall == 0) {
			angular.element(document.querySelector('#hero-has-mask')).addClass("heroUp");
			angular.element(document.querySelector('#answerArea')).addClass("visibleUpElement");
		}
		$scope.waitingText = "Tenez vous prêts !"
		if ($scope.counter>0) {
			stopped = $timeout(function() {
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
