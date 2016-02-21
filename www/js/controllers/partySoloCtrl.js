angular.module('app.partysolo', [])

.controller('PartySoloCtrl', function($scope, $rootScope, $state, $http, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk) {
	console.log('$rootScope.quizSelected');
	console.log($rootScope.quizSelected);
    $scope.countdownTxt = 10;
    // $scope.countdown = function() {
    //     var time = 10; /* how long the timer runs for */
    //     var initialOffset = '440';
    //     var i = 1
    //     var interval = setInterval(function() {
    //         angular.element('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    //         $scope.countdownTxt = i;
    //         if (i == time) {
    //             clearInterval(interval);
    //         }
    //         i++;
    //     }, 1000);
    // }
    // $scope.countdown();
	$scope.party = "";


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
	$timeout(function() {
		angular.element(document.querySelector('#hero-has-mask')).addClass("heroUp");
		angular.element(document.querySelector('#nb-question-id')).addClass("hideUpElement");
	}, 4000);
	$timeout(function() {
		angular.element(document.querySelector('#answerArea')).addClass("visibleUpElement");
	}, 5000);

    // Set Ink
    ionicMaterialInk.displayEffect();

  	Waves.displayEffect();

})
