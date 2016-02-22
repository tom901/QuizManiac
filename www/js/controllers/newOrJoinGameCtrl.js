angular.module('app.newOrJoinGame', [])
.controller('NewOrJoinGameCtrl', function($rootScope, $scope, $timeout, ionicMaterialMotion, ionicMaterialInk, URL_SERVER) {
    $scope.isExpanded = false;
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
    $timeout(function() {
        $rootScope.shortWhooshSound1.play();
        $timeout(function() {
            $rootScope.shortWhooshSound2.play();
        }, 100);
    }, 1200);


    $scope.popSound = function () {
        $rootScope.popDrip.play();
    }

    // Set Ink
    ionicMaterialInk.displayEffect();
	// $rootScope.toggleSound();
})
