angular.module('app.listAllQuiz', [])
.controller('ListAllQuizCtrl', function($scope,$rootScope, QuizService, URL_SERVER) {
	QuizService.getAllQuiz(function(data){
		$scope.listQuiz = data;
	})
	$scope.setCurrentQuiz = function(quizSelected){
		$rootScope.quizSelected = quizSelected;
	}
})