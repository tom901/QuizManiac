angular.module('app.partysolo', [])
.controller('partySoloCtrl', function($scope, $http) {
	
	$scope.party = "";
	$http.get('http://127.0.0.1:9000/getQuizSimpsons')
	.then(function(response){
		console.log(response);
		$scope.party = response;
	},
	function(response){
		console.error("Echec de la requete", response.status, response);
	})
})