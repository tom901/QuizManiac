angular.module('app.gameService', [])

.factory('GameService', function($http, $rootScope, URL_SERVER) {
  return {
    createNewGame: function(userId, nameGame, numberUser, gameType) {
      return $http.get(URL_SERVER+'/createGame/'+userId+'/'+nameGame+'/'+numberUser+'/'+gameType).then(function(data) {
        console.log('Game Service : createNewGame');
        console.log('data.data');
        console.log(data.data);
        $rootScope.game = data.data;
        return data.data;
      });
    },
    getGameByName : function(nameGame){
      return $http.get(URL_SERVER+'/getGameByName/'+nameGame).then(function(data) {
        $rootScope.game = data.data;
        return data.data;
      });
    },
    getAllGames : function(callback){
      return $http.get(URL_SERVER+'/getAllGamesNotStarted').then(function(data) {
        if(callback){
          callback(data.data);
        }else{
          return data.data;
        }
      });
    },
    randomGame : function(userId){
      return $http.get(URL_SERVER+'/randomGame/'+userId).then(function(data) {
        $rootScope.game = data.data;
        return data.data;
      });
    },
    setFinishGame : function(userId,gameId){
      return $http.get(URL_SERVER+'/setGameToFinish/'+userId+'/'+gameId).then(function(data) {
        $rootScope.game = data.data;
        return data.data;
      });
    },
    setPlayerInGame : function(userId, gameId){
      return $http.get(URL_SERVER+'/joinUserInGame/'+userId+'/'+gameId).then(function(data) {
       $rootScope.game = data.data;
       console.log('setPlayerInGame');
       console.log($rootScope.game);
       return data.data;
     });
    }
  }
});
