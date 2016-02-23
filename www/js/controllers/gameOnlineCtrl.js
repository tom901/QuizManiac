angular.module('app.gameOnline', [])

.controller('GameOnlineCtrl', function($scope, $rootScope, $state, $http,$ionicHistory,
    $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk,$interval,
    QuizService, GameService) {
    $scope.countdownTxt = 10;
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
                        toastr.warning("L'adversaire a déjà répondu");
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
            }else if($rootScope.game.gameType === 'duel'){
                console.log('Partie Duel');
            }
        });
        $scope.$on('$ionicView.beforeLeave', function () {
            if(refreshIntervalId != null){
                toastr.remove();
                $scope.countTimer = 0;
                answerBlocked = false;
                clearInterval(refreshIntervalId);
            }
            $rootScope.game = null;
        });

        var goodAnswer = 0;

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }

        $scope.nextQuestion = function(answer){
            if(!answerBlocked){
                if(answer.weight == 1){
                    toastr.remove();
        			if ($rootScope.goodAnswerSound.playing) {
        				$rootScope.goodAnswerSound.currentTime = 0;
        			}
                    toastr.success('Bonne réponse !', 'Bien joué');
                    $scope.countQuestion++;
                    QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                        $scope.question = data;
                        $scope.countTimer = 0;
                    });
                    goodAnswer++;
                }else{
        			if ($rootScope.jar_deny.playing) {
        				$rootScope.jar_deny.currentTime = 0;
        			}
                    $rootScope.jar_deny.play();
                    toastr.remove();
                    toastr.error('Mauvaise réponse !', 'Essayez encore');
                    toastr.warning('2 secondes de pénalités');
                    answerBlocked = true;
                    setTimeout(function(){
                        answerBlocked = false;
                        console.log('on peut cocher de nouveau');
                    }, 2000);
                }
            }else{
                toastr.warning('Impossible de répondre pour le moment!');
                console.log('impossible de répondre pour le moment');
            }
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
