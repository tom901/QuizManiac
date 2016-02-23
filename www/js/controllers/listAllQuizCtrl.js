angular.module('app.listAllQuiz', [])
.controller('ListAllQuizCtrl', function($scope,$rootScope, QuizService, URL_SERVER, ionicMaterialInk, ionicMaterialMotion) {
	$scope.$on('$ionicView.enter', function () {
        QuizService.getAllQuiz(function(data){
    		$scope.listQuiz = data;
    		$scope.listQuiz.push(data);
    	})
    });
	$scope.setCurrentQuiz = function(quizSelected){
		$rootScope.popDrip.play();
		$rootScope.quizSelected = quizSelected;
	}

    $scope.isExpanded = true;

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
})
