// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// var URL_LOCAL_SERVER = 'http://192.168.137.1:9000';
var URL_LOCAL_SERVER = 'http://localhost:9000';
var app = angular.module('app', [
  'ionic',
  'ngCordova',
  'ionic-material',
  'app.home',
  'app.menu', 
  'app.gameover',
  'app.quizz',
  'app.signup',
  'app.start',
  'app.themes',
  'app.newGame',
  'app.themeSelected',
  'app.waitTheOthers',
  'app.newOrJoinGame',
  'app.joinGame',
  'app.routes',
  'app.services',
  'app.directives',
  'app.partysolo',
  'app.listAllQuiz',
  'app.userService',
  'app.quizService',
  'app.gameService'
  ])
.constant('URL_SERVER',URL_LOCAL_SERVER)

.run(function($ionicPlatform) {
  var deviceInformation = ionic.Platform.device();
  var isWebView = ionic.Platform.isWebView();
  var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();
  var isWindowsPhone = ionic.Platform.isWindowsPhone();
  var isAndroid = ionic.Platform.isAndroid();



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.navBar.alignTitle('left');
    $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
  });
