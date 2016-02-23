angular.module('app.gameOnline', [])

.controller('GameOnlineCtrl', function($scope, $rootScope, $state, $http,$ionicHistory,
    $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk,
    QuizService, GameService) {
        $scope.countdownTxt = 10;


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

        $rootScope.$ionicGoBack = function(backCount) {
            $ionicHistory.goBack(backCount);
            console.log('dans la fonction back');
            $rootScope.game = null;
            $state.go('app.newOrJoinGame');
            clearInterval(refreshIntervalId);

        };

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }

        $scope.nextQuestion = function(answer){
            if(answer.weight == 1){
                toastr.clear()
                toastr.success('Bonne réponse !', 'Bien joué');
                $rootScope.pad_confirm.play();
                $scope.countQuestion++;
                QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                    $scope.question = data;
                });
                goodAnswer++;
            }else{
                $rootScope.jar_deny.play();
                toastr.clear()
                toastr.error('Bonne réponse !', 'Bien joué');
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
        $scope.isExpanded = false;

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
