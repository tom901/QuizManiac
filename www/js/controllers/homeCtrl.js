angular.module('app.home', [])
.controller('homeCtrl', function($scope, $rootScope) {

	$rootScope.audioTexte = "Désactiver le son";
	$rootScope.audioIcon = "ion-volume-mute";

	$rootScope.audio = new Audio("audio/TetrisStage.mp3");
	$rootScope.audio.play();

	$rootScope.toggleSound = function(){
		if($rootScope.audio.paused){
			$rootScope.audioTexte = "Désactiver le son";
			$rootScope.audioIcon = "ion-volume-mute";
			$rootScope.audio.play();
		}
		else{
			$rootScope.audioTexte = "Activer le son";
			$rootScope.audioIcon = "ion-volume-high";
			$rootScope.audio.pause();
		}
		
	}
});