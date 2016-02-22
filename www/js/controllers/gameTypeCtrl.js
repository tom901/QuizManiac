angular.module('app.gameType', [])
.controller('GameTypeCtrl', function($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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

    // Set Ink
    ionicMaterialInk.displayEffect();
	// $rootScope.toggleSound();
})
