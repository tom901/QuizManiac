angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('menu', {
      url: '/page1',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('home', {
      url: '/page1',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
        
      
    
      
        
    .state('start', {
      url: '/page6',
      templateUrl: 'templates/start.html',
      controller: 'startCtrl'
    })
        
      
    
      
        
    .state('newParty', {
      url: '/page16',
      templateUrl: 'templates/newParty.html',
      controller: 'newPartyCtrl'
    })
        
      
    
      
        
    .state('themes', {
      url: '/page8',
      templateUrl: 'templates/themes.html',
      controller: 'themesCtrl'
    })
        
      
    
      
        
    .state('waitTheOthers', {
      url: '/page10',
      templateUrl: 'templates/waitTheOthers.html',
      controller: 'waitTheOthersCtrl'
    })
        
      
    
      
        
    .state('themsSelcted', {
      url: '/page12',
      templateUrl: 'templates/themsSelcted.html',
      controller: 'themsSelctedCtrl'
    })
        
      
    
      
        
    .state('quiz', {
      url: '/page13',
      templateUrl: 'templates/quiz.html',
      controller: 'quizCtrl'
    })
        
      
    
      
        
    .state('gameOver', {
      url: '/page14',
      templateUrl: 'templates/gameOver.html',
      controller: 'gameOverCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/page9',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});