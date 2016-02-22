angular.module('app.gameType', [])
.controller('GameTypeCtrl', function($scope,$rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.isExpanded = false;

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
