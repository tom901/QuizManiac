angular.module('app.gameOnline', [])

.controller('GameOnlineCtrl', function($scope, $rootScope, $state, $http,$ionicHistory,
    $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk,$interval,
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
        $scope.countTimer = 0;

        //Récupération de la premiere question a afficher
        QuizService.getNextQuestion($rootScope.game.id,$scope.countQuestion, function(data){
            $scope.question = data;
        });
        var refreshIntervalId = null;

        $scope.$on('$ionicView.enter', function () {
            if($rootScope.game.gameType === 'death'){
                refreshIntervalId = setInterval(function(){
                    GameService.getGameByName($rootScope.game.name);
                    if($rootScope.game.countCurrentQuestion > $scope.countQuestion){
                        QuizService.getNextQuestion($rootScope.game.id, $rootScope.game.countCurrentQuestion , function(data){
                            $scope.question = data;
                            $scope.countQuestion = $rootScope.game.countCurrentQuestion;
                        });
                    }
                }, 100);
            }else if($rootScope.game.gameType === 'peace'){
                refreshIntervalId = setInterval(function(){
                    if($scope.countTimer == 19){
                        $scope.countQuestion++;
                        QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                            $scope.question = data;
                            $scope.countTimer = 0;
                        });
                    }
                    $scope.$apply(function() {
                        $scope.countTimer++;
                    });
                }, 1000);
                // $scope.$on("$destroy", function(){
                //     clearInterval(refreshIntervalId);
                // });
            }else if($rootScope.game.gameType === 'duel'){
                console.log('Partie Duel');
            }
        });
        $scope.$on('$ionicView.leave', function () {
            if(refreshIntervalId != null){
                toastr.remove();
                $scope.countTimer = 0;
                clearInterval(refreshIntervalId);
            }
        });

        var goodAnswer = 0;

        // $rootScope.$ionicGoBack = function(backCount) {
        //     $ionicHistory.goBack(backCount);
        //     console.log('dans la fonction back');
        //     $rootScope.game = null;
        //     $state.go('app.home');
        //     if(refreshIntervalId != null){
        //         clearInterval(refreshIntervalId);
        //     }
        //     // $interval.cancel(refreshIntervalId);
        // };

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }

        $scope.nextQuestion = function(answer){
            if(answer.weight == 1){
                console.log('Bonne réponse !!! ');
                $scope.countQuestion++;
                QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                    $scope.question = data;
                    $scope.countTimer = 0;
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
                toastr.remove()
                toastr.success('Bonne réponse !', 'Bien joué');
    			if ($rootScope.goodAnswerSound.playing) {
    				$rootScope.goodAnswerSound.currentTime = 0;
    			}
                $rootScope.goodAnswerSound.play();
                $scope.countQuestion++;
                QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                    $scope.question = data;
                });
                goodAnswer++;
            }else{
    			if ($rootScope.jar_deny.playing) {
    				$rootScope.jar_deny.currentTime = 0;
    			}
                $rootScope.jar_deny.play();
                toastr.remove()
                toastr.error('Mauvaise réponse !', 'Bouh !');
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
