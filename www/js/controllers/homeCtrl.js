angular.module('app.home', [])
.controller('homeCtrl', function($scope, $rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk, URL_SERVER) {
	$rootScope.audioTexte = "Muet ";
	$rootScope.audioIcon = "ion-volume-mute";

// Set Header
/*    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();*/
    $scope.isExpanded = false;
/*    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);*/

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
	
	$rootScope.toggleSound = function(){
		$rootScope.audio = ($rootScope.audio == null)? new Audio("audio/TetrisStage.mp3") : $rootScope.audio;

		if($rootScope.audio.paused){
			$rootScope.audioTexte = "Muet ";
			$rootScope.audioIcon = "ion-volume-mute";
			$rootScope.audio.play();
		}
		else{
			$rootScope.audioTexte = "Son ";
			$rootScope.audioIcon = "ion-volume-high";
			$rootScope.audio.pause();
		}
		
	}
	// $rootScope.toggleSound();
});