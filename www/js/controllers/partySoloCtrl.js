angular.module('app.partysolo', [])

.controller('PartySoloCtrl', function($scope, $rootScope, $state, $http, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk) {

	$rootScope.audio.pause();
	$rootScope.WaitingTheOther.play();
	$rootScope.WaitingTheOther.volume = 0.5;
	$rootScope.WaitingTheOther.loop = true;

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
			toastr.remove()
			toastr.success('Bonne réponse !', 'Bien joué');
			if ($rootScope.goodAnswerSound.playing) {
				$rootScope.goodAnswerSound.currentTime = 0;
			}
			$rootScope.goodAnswerSound.play();
			goodAnswer++;
		}else{
			if ($rootScope.jar_deny.playing) {
				$rootScope.jar_deny.currentTime = 0;
			}
			$rootScope.jar_deny.play();
			toastr.remove()
			toastr.error('Mauvaise réponse !', 'Bouh !');
		}

		if($scope.countQuestion == $rootScope.quizSelected.questions.length - 1){
			$rootScope.WaitingTheOther.pause();
			$rootScope.WaitingTheOther.volume = 0;
			$rootScope.Round_Complete.play();
			$rootScope.Round_Complete.volume = 0.5;

			toastr.remove();
			alert('Vous avez répondu à '+ Math.round( (goodAnswer * 100) / $rootScope.quizSelected.questions.length) +'% de bonnes réponses');

			$rootScope.Round_Complete.pause();

			$rootScope.audio.play();
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
	}, 2000);
	$timeout(function() {
		angular.element(document.querySelector('#answerArea')).addClass("visibleUpElement");
	}, 3000);

	// Set Ink
	ionicMaterialInk.displayEffect();

	Waves.displayEffect();

})
