angular.module('app.partysolo', [])
.controller('partySoloCtrl', function($scope,$rootScope, $http, $ionicSlideBoxDelegate) {
	console.log('$rootScope.quizSelected');
	console.log($rootScope.quizSelected);

	$scope.nextSlide = function() {
    	$ionicSlideBoxDelegate.next();
  	}
})


