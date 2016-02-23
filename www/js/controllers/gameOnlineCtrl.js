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

        var answerBlocked = false ;
        console.log('$rootScope.game.gameType');
        console.log($rootScope.game.gameType);
        $scope.$on('$ionicView.enter', function () {
            if($rootScope.game.gameType === 'death' || $rootScope.game.gameType === 'random'){
                console.log('gameType egale death ou random');
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
        $scope.$on('$ionicView.beforeLeave', function () {
            if(refreshIntervalId != null){
                console.log('gameOnlineCtrl $ionicView.beforeLeave : ');
                console.log(refreshIntervalId);
                $scope.countTimer = 0;
                answerBlocked = false;
                clearInterval(refreshIntervalId);
            }
            $rootScope.game = null;
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
            if(!answerBlocked){
                if(answer.weight == 1){
                    toastr.clear()
                    toastr.success('Bonne réponse !', 'Bien joué');
                    $rootScope.pad_confirm.play();
                    $scope.countQuestion++;
                    QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                        $scope.question = data;
                        $scope.countTimer = 0;
                    });
                    goodAnswer++;
                }else{
                    $rootScope.jar_deny.play();
                    toastr.clear()
                    toastr.error('Mauvaise réponse !', 'Essayez encore');
                    answerBlocked = true;
                    setTimeout(function(){
                        answerBlocked = false;
                        console.log('on peut cocher de nouveau');
                    }, 2000);
                }
            }else{
                console.log('impossible de répondre pour le moment');
            }
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

        // Set Ink
        ionicMaterialInk.displayEffect();

        Waves.displayEffect();

    })
