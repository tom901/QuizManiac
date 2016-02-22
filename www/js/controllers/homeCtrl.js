angular.module('app.home', [])
.controller('homeCtrl', function($scope, $timeout,$cordovaToast,$ionicPlatform, $state,$rootScope,ionicMaterialMotion, ionicMaterialInk, URL_SERVER) {
    $scope.checkUserSigned = function(){
        $rootScope.popDrip.play();
        if($rootScope.user == null){
            $state.go('app.signup');
        }else{
            $state.go('app.newOrJoinGame');
        }
    }
    $scope.popDrip = function () {
        $rootScope.popDrip.play();
    }
    $scope.isExpanded = false;

    // Set Motion
    $timeout(function() {
        $rootScope.shortWhooshSound.play();
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    $timeout(function() {
        $rootScope.shortWhooshSound1.play();
        $timeout(function() {
            $rootScope.shortWhooshSound2.play();
        }, 100);
    }, 1200);
    $timeout(function() {
        $rootScope.chime_bell_ding.play();
    }, 1400);

    // Set Ink
    ionicMaterialInk.displayEffect();
	// $rootScope.toggleSound();
});
