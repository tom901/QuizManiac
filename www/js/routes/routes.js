angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
      url: '/app',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'side-menu': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('start', {
      url: '/page6',
      views: {
        'side-menu': {
          templateUrl: 'templates/start.html',
          controller: 'startCtrl'
        }
      }  
    })
    .state('app.newGame', {
      url: '/newGame',
      views: {
        'side-menu': {
          templateUrl: 'templates/newGame.html',
          controller: 'NewGameCtrl'
        }
      } 
    }) 
    .state('app.joinGame', {
      url: '/joinGame',
      views: {
        'side-menu': {
          templateUrl: 'templates/joinGame.html',
          controller: 'JoinGameCtrl'
        }
      } 
    }) 
    .state('app.newOrJoinGame', {
      url: '/newOrJoinGame',
      views: {
        'side-menu': {
          templateUrl: 'templates/newOrJoinGame.html',
          controller: 'NewOrJoinGameCtrl'
        }
      } 
    }) 
    .state('app.listAllQuiz', {
      url: '/listAllQuiz',
      views: {
        'side-menu': {
          templateUrl: 'templates/listAllQuiz.html',
          controller: 'ListAllQuizCtrl'
        }
      } 
    }) 
    .state('themes', {
      url: '/page8',
      views: {
        'side-menu': {
          templateUrl: 'templates/themes.html',
          controller: 'themesCtrl'
        }
      }
    })
    .state('app.waitTheOthers', {
      url: '/waitTheOthers',
      views: {
        'side-menu': {
          templateUrl: 'templates/waitTheOthers.html',
          controller: 'waitTheOthersCtrl'
        }
      }
    })
    .state('themsSelcted', {
      url: '/page12',
      views: {
        'side-menu': {
          templateUrl: 'templates/themsSelcted.html',
          controller: 'themsSelctedCtrl'
        }
      }
    })  
    .state('quiz', {
      url: '/page13',
      views: {
        'side-menu': {
          templateUrl: 'templates/quiz.html',
          controller: 'quizCtrl'
        }
      }
    })
    .state('gameOver', {
      url: '/page14',
      views: {
        'side-menu': {
          templateUrl: 'templates/gameOver.html',
          controller: 'gameOverCtrl'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      views: {
        'side-menu': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })
    .state('app.partysolo', {
      url: '/partysolo',
      views: {
        'side-menu': {
          templateUrl: 'templates/partysolo.html',
          controller: 'PartySoloCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});