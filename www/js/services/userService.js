angular.module('app.userService', [])

.factory('UserService', function($http, $rootScope, URL_SERVER) {
  return {
    getAllUser: function() {
      return $http.get(URL_SERVER+'/getAllUsers').then(function(data) {
      	return data.data;
    	});
    },
    setUser : function(userName){
    	return $http.get(URL_SERVER+'/createUser/'+userName).then(function(data) {
    		$rootScope.user = data.data;
    		return data.data;
    	});
    }

  }
});
