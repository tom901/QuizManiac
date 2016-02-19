angular.module('app.quizService', [])

.factory('QuizService', function($http, $rootScope, URL_SERVER) {
  return {
    getAllQuiz : function(callback){
      return $http.get(URL_SERVER+'/getAllQuiz').then(function(data) {
        if(callback){
          callback(data.data);
        }else{
          return data.data;
        }
      });
    }
  }
});
