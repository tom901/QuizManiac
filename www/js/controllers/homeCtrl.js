angular.module('app.home', [])
.controller('homeCtrl', function($scope, $rootScope) {

	

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