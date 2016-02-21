angular.module('app.partysolo', [])
.controller('partySoloCtrl', function($scope, $http, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk) {
	console.log('$rootScope.quizSelected');
	console.log($rootScope.quizSelected);
    $scope.countdownTxt = 10;
    $scope.countdown = function() {
        var time = 10; /* how long the timer runs for */
        var initialOffset = '440';
        var i = 1
        var interval = setInterval(function() {
            angular.element('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
            $scope.countdownTxt = i;
            if (i == time) {
                clearInterval(interval);
            }
            i++;  
        }, 1000);
    }
    $scope.countdown();
	$scope.party = "";
	$http.get('http://127.0.0.1:9000/getQuizSimpsons')
	.then(function(response){
		$scope.party = response.data;
		console.log($scope.party);
	},
	function(response){
		console.error("Echec de la requete", response.status, response);
	})

	$scope.nextSlide = function() {
    	$ionicSlideBoxDelegate.next();
  	}
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
	
  	Waves.displayEffect();

})


