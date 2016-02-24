angular.module('app.partysolo', [])

.controller('PartySoloCtrl', function($scope, $rootScope, $state, $http, $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk) {

	$scope.countdownTxt = 10;
	$scope.party = "";
	$scope.hideAnswerarea = false;


	//compteur pour faire défiler les questions lors de chaque réponse
	$scope.countQuestion  = 0;
	$scope.goodAnswer = 0;

	$scope.nextQuestion = function(answer){
		if(answer.weight == 1){
			toastr.remove();
			toastr.success('Bonne réponse !', 'Bien joué');
			$rootScope.goodAnswerSound.load();
			$rootScope.goodAnswerSound.play();
			$scope.goodAnswer++;
		}else{
			$rootScope.jar_deny.load();
			$rootScope.jar_deny.play();
			toastr.remove()
			toastr.error('Mauvaise réponse !', 'Oups !');
		}

		if($scope.countQuestion == $rootScope.quizSelected.questions.length - 1){
			toastr.remove();
			$scope.hideAnswerarea = true;
			$rootScope.WaitingTheOther.pause();
			$rootScope.WaitingTheOther.volume = 0;
			$rootScope.Round_Complete.play();
			$rootScope.Round_Complete.volume = 0.5;
			angular.element(document.querySelector('#answerArea')).addClass("hideUpElement");
			toastr.success('Fin de la partie !');
			$scope.pourcentage = Math.round( ($scope.goodAnswer * 100) / $rootScope.quizSelected.questions.length);
			$scope.g1 = new JustGage({
				id: "g1",
				value: $scope.pourcentage,
				min: 0,
				max: 100,
				relativeGaugeSize: true,
				title: "Votre score est de",
		        symbol: '%',
		        pointer: true,
		        pointerOptions: {
		          toplength: -15,
		          bottomlength: 10,
		          bottomwidth: 12,
		          color: '#8e8e93',
		          stroke: '#ffffff',
		          stroke_width: 3,
		          stroke_linecap: 'round'
		        },
		        gaugeWidthScale: 0.6,
		        counter: true
			});
			// $timeout(function () {
			// 	$rootScope.Round_Complete.pause();
			// 	$rootScope.audio.play();
			// 	//$state.go('app.home');
			// 	$scope.countQuestion  = 0;
			// }, 5000);
			//$scope.goodAnswer = 0;
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
	$scope.$on('$ionicView.beforeLeave', function () {
		$rootScope.Round_Complete.pause();
		$rootScope.Round_Complete.load();
		$rootScope.audio.load();
		$rootScope.audio.play();
		$rootScope.WaitingTheOther.pause();
		$rootScope.WaitingTheOther.load();
		$scope.countdownTxt = 10;
		$scope.party = "";
		$scope.hideAnswerarea = false;
		toastr.remove();
		$scope.countQuestion  = 0;
		$scope.goodAnswer = 0;
	});

	// Set Ink
	ionicMaterialInk.displayEffect();

	Waves.displayEffect();

})
