angular.module('app.listAllQuiz', [])
.controller('ListAllQuizCtrl', function($scope,$rootScope, QuizService) {
	QuizService.getAllQuiz(function(data){
		$scope.listQuiz = data;
	})

	$scope.setCurrentQuiz = function(quizSelected){
		$rootScope.quizSelected = quizSelected;
	}
})