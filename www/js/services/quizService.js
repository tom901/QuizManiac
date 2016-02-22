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
    },
    getNextQuestion : function(idGame, countQuestion, callback){
        return $http.get(URL_SERVER+'/getQuestionRandom/'+idGame+'/'+countQuestion).then(function(data) {
            if(callback){
              console.log('data callback');
              console.log(data);
              callback(data.data);
          }else{
              return data.data;
          }
      });
    }
}

});
