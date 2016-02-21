angular.module('app.partysolo', [])
.controller('PartySoloCtrl', function($scope,$rootScope, $state, $ionicSlideBoxDelegate) {
	console.log('$rootScope.quizSelected');
	console.log($rootScope.quizSelected);

	//compteur pour faire défiler les questions lors de chaque réponse
	$scope.countQuestion  = 0;
	var goodAnswer = 0;

	$scope.nextSlide = function() {
    	$ionicSlideBoxDelegate.next();
  	}

  	$scope.nextQuestion = function(answer){
  		if(answer.weight == 1){
  			console.log('Bonne réponse !!! ');
			goodAnswer++;
  		}else{
  			console.log('Mauvaise Réponse !!!');
  		}

  		if($scope.countQuestion == $rootScope.quizSelected.questions.length - 1){
  			console.log('avant calcule ');
  			console.log(goodAnswer);
  			alert('Vous avez répondu à '+ Math.round( (goodAnswer * 100) / $rootScope.quizSelected.questions.length) +'% de bonnes réponses');
  			$state.go('app.home');
			$scope.countQuestion  = 0;
			goodAnswer = 0;
  		}else{
	  		$scope.countQuestion++;
  		}
  	}
})


