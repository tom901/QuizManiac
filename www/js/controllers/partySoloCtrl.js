angular.module('app.partysolo', [])
.controller('partySoloCtrl', function($scope, $http, $ionicSlideBoxDelegate) {

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
})


