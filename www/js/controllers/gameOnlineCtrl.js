angular.module('app.gameOnline', [])

.controller('GameOnlineCtrl', function($scope, $rootScope, $state, $http,
   $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk,
   QuizService, GameService) {
    $scope.countdownTxt = 10;
    // $scope.countdown = function() {
    //     var time = 10; /* how long the timer runs for */
    //     var initialOffset = '440';
    //     var i = 1
    //     var interval = setInterval(function() {
    //         angular.element('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    //         $scope.countdownTxt = i;
    //         if (i == time) {
    //             clearInterval(interval);
    //         }
    //         i++;  
    //     }, 1000);
    // }
    // $scope.countdown();
    


	//compteur pour faire défiler les questions lors de chaque réponse
	$scope.countQuestion  = 0;
   QuizService.getNextQuestion($rootScope.game.id,$scope.countQuestion, function(data){
      $scope.question = data;
  });


   var refreshIntervalId = setInterval(function(){ 
        GameService.getGameByName($rootScope.game.name);
        if($rootScope.game.countCurrentQuestion > $scope.countQuestion){
            QuizService.getNextQuestion($rootScope.game.id, $rootScope.game.countCurrentQuestion , function(data){
                $scope.question = data;
                $scope.countQuestion = $rootScope.game.countCurrentQuestion;
            });
        }
    }, 500);

   var goodAnswer = 0;

   $scope.nextSlide = function() {
     $ionicSlideBoxDelegate.next();
 }

 $scope.nextQuestion = function(answer){
     if(answer.weight == 1){
        console.log('Bonne réponse !!! ');
        $scope.countQuestion++;
        QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
        $scope.question = data;
      });
        goodAnswer++;
    }else{
     console.log('Mauvaise Réponse !!!');
 }

   // if($scope.countQuestion == $rootScope.quizSelected.questions.length - 1){
   //     console.log('avant calcule ');
   //     console.log(goodAnswer);
   //     alert('Vous avez répondu à '+ Math.round( (goodAnswer * 100) / $rootScope.quizSelected.questions.length) +'% de bonnes réponses');
   //     $state.go('app.home');
   //     $scope.countQuestion  = 0;
   //     goodAnswer = 0;
   // }else{
   //     $scope.countQuestion++;
   // }
}
  	// Set Header
/*    $scope.$parent.showHeader();
$scope.$parent.clearFabs();*/
$scope.isExpanded = false;
/*    $scope.$parent.setExpanded(false);
$scope.$parent.setHeaderFab(false);*/

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    Waves.displayEffect();

})


