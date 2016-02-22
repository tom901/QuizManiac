angular.module('app.home', [])
.controller('homeCtrl', function($scope, $timeout,$cordovaToast,$ionicPlatform,
                                 ionicMaterialMotion, ionicMaterialInk, URL_SERVER) {
    // var device = ionic.Platform.isWebView();
    // console.log(device);
    //  var deviceInformation = ionic.Platform.device();
    // console.log(deviceInformation);
     
    // if(device){
    // $ionicPlatform.ready(function() {
    //       $cordovaToast.showShortTop('Here is a message').then(function(success) {
    //         // success
    //         console.log('test Toast Success');
    //       }, function (error) {
    //         // error
    //         console.log('test Toast Error');

    //       });
    //     });
    // }
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
	// $rootScope.toggleSound();
});
