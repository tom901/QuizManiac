angular.module('app.gameOnline', [])

.controller('GameOnlineCtrl', function($scope, $rootScope, $state, $http,$ionicHistory,
    $ionicSlideBoxDelegate, $timeout, ionicMaterialMotion, ionicMaterialInk,$interval,
    QuizService, GameService) {

        $scope.countdownTxt = 10;
        $scope.countQuestion  = 0;
        $scope.countTimer = 20;
        var refreshIntervalId = null;
        var answerBlocked = null;

        $scope.$on('$ionicView.enter', function () {
            var gameEnded = false;
            var nbCall = 0;
            $scope.hideAnswerarea = false;
        	$scope.gamIsFinished = function() {
                toastr.remove();
    			$scope.hideAnswerarea = true;
    			$rootScope.QuizmaniaSpeedRound.pause();
    			$rootScope.QuizmaniaSpeedRound.volume = 0;
    			$rootScope.Round_Complete.load();
    			$rootScope.Round_Complete.play();
    			$rootScope.Round_Complete.volume = 0.5;
    			toastr.success('Fin de la partie !');
    			$scope.pourcentage = Math.round( ($scope.goodAnswer * 100) / $scope.maxQuestion);
                document.getElementById('g1').innerHTML = "";
    			$scope.g1 = new JustGage({
    				id: "g1",
    				value: $scope.pourcentage,
    				min: 0,
    				max: 100,
    				relativeGaugeSize: true,
    				title: "Votre score est de",
    		        symbol: '%',
    		        pointer: true,
                    laber : $scope.goodAnswer  + " bonnes réponses",
    		        pointerOptions: {
    		          toplength: -15,
    		          bottomlength: 10,
    		          bottomwidth: 12,
    		          color: '#8e8e93',
    		          stroke: '#ffffff',
    		          stroke_width: 3,
    		          stroke_linecap: 'round'
    		        },
    		        gaugeWidthScale: 0.6,
    		        counter: true
    			});
                if(refreshIntervalId != null){
                    toastr.remove();
                    $scope.countTimer = 20;
                    answerBlocked = false;
                    clearInterval(refreshIntervalId);
                }
        	}
            $scope.gamIsFinishedVS = function() {
                toastr.remove();
    			$scope.hideAnswerarea = true;
    			$rootScope.QuizmaniaSpeedRound.pause();
    			$rootScope.QuizmaniaSpeedRound.volume = 0;
    			$rootScope.Round_Complete.load();
    			$rootScope.Round_Complete.play();
    			$rootScope.Round_Complete.volume = 0.5;
    			toastr.success('Fin de la partie !');
    			$scope.pourcentage = Math.round( ($scope.countAdversaire * 100) / $scope.maxQuestion);
                document.getElementById('g2').innerHTML = "";
                $scope.g2 = new JustGage({
    				id: "g2",
    				value: $scope.pourcentage,
    				min: 0,
    				max: 100,
    				relativeGaugeSize: true,
    				title: "Votre adversaire",
    		        symbol: '%',
    		        pointer: true,
                    laber : $scope.countAdversaire  + " bonnes réponses",
    		        pointerOptions: {
    		          toplength: -15,
    		          bottomlength: 10,
    		          bottomwidth: 12,
    		          color: '#8e8e93',
    		          stroke: '#ffffff',
    		          stroke_width: 3,
    		          stroke_linecap: 'round'
    		        },
    		        gaugeWidthScale: 0.6,
    		        counter: true
    			});
                if(refreshIntervalId != null){
                    toastr.remove();
                    $scope.countTimer = 20;
                    answerBlocked = false;
                    clearInterval(refreshIntervalId);
                }
        	}
            $scope.countdownTxt = 10;
            $scope.maxQuestion = $rootScope.game.questions.length;
            $scope.percentEvolution = 10;
            $scope.countQuestion  = 0;
            $scope.countTimer = 20;
            $scope.countAdversaire = 0;
            refreshIntervalId = null;
            answerBlocked = null;
            $scope.showTimer=false;
            $rootScope.audio.pause();
            $rootScope.QuizmaniaSpeedRound.load();
            $rootScope.QuizmaniaSpeedRound.play();
            $rootScope.QuizmaniaSpeedRound.volume = 0.8;
            $rootScope.QuizmaniaSpeedRound.loop = true;
            //Récupération de la premiere question a afficher
            QuizService.getNextQuestion($rootScope.game.id,$scope.countQuestion, function(data){
                $scope.question = data;
            });

            refreshIntervalId = null;
            answerBlocked = false ;
            $scope.countQuestion = 0;

            if($rootScope.game.gameType === 'death' || $rootScope.game.gameType === 'random'){
                refreshIntervalId = setInterval(function(){$scope.maxQuestion = $rootScope.game.questions.length;
                    GameService.getGameByName($rootScope.game.name);
                    if($rootScope.game.countCurrentQuestion > $scope.countQuestion){
                        QuizService.getNextQuestion($rootScope.game.id, $rootScope.game.countCurrentQuestion , function(data){
                            toastr.warning("L'adversaire a déjà répondu");
                            $scope.countAdversaire++;
                            if (data === "" || data.length == 0 ||  typeof(data) == "string") {
                                gameEnded = true;
                            } else {
                                $scope.question = data;
                                $scope.countQuestion = $rootScope.game.countCurrentQuestion;
                            }
                            if (gameEnded && nbCall==0) {
                                $scope.gamIsFinished();
                                $scope.gamIsFinishedVS();
                                nbCall++;
                            }
                        });
                    }
                    $scope.percentEvolution = Math.round( ( ($scope.countQuestion + 1) * 100) / 10);
                }, 100);
            }else if($rootScope.game.gameType === 'peace'){
                console.log("$rootScope.game.gameType === 'peace'");
                $scope.showTimer=true;
                refreshIntervalId = setInterval(function(){
                    $scope.maxQuestion = $rootScope.game.questions.length;
                    if($scope.countTimer == 1){
                        $scope.countQuestion++;
                        QuizService.getNextQuestion($rootScope.game.id, $scope.countQuestion , function(data){
                            $scope.question = data;
                            $scope.countTimer = 20;
                            if (data === "" || data.length == 0 ||  typeof(data) == "string") {
                                gameEnded = true;
                            }
                            if (gameEnded && nbCall==0) {
                                GameService.setFinishGame();
                                $scope.gamIsFinished();
                                nbCall++;
                            }
                        });
                    }
                    $scope.$apply(function() {
                        $scope.countTimer--;
                    });
                    $scope.percentEvolution = Math.round( ( ($scope.countQuestion + 1) * 100) / 10);
                }, 1000);
            }else if($rootScope.game.gameType === 'duel'){
                console.log('Partie Duel');
            }

            $scope.goodAnswer = 0;

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
                            if (data === "" || data.length == 0 ||  typeof(data) == "string") {
                                gameEnded = true;
                            }
                            $scope.goodAnswer++;
                            $scope.pourcentage = Math.round( ($scope.goodAnswer * 100) / 10);
                            if (gameEnded && nbCall==0) {
                                $scope.gamIsFinished();
                                if($rootScope.game.gameType !== 'peace')
                                    $scope.gamIsFinishedVS();
                                nbCall++;
                            }
                        });
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


            $scope.nextSlide = function() {
                $ionicSlideBoxDelegate.next();
            }

            // Set Ink
            ionicMaterialInk.displayEffect();

            Waves.displayEffect();
        });
        $scope.$on('$ionicView.beforeLeave', function () {
            document.getElementById('g1').innerHTML = "";
            document.getElementById('g2').innerHTML = "";
            $scope.countdownTxt = 10;
            $scope.countQuestion  = 0;
            $scope.countTimer = 20;
            answerBlocked = null;
            $rootScope.Round_Complete.pause();
            $rootScope.Round_Complete.load();
            $rootScope.audio.load();
            $rootScope.audio.play();
            $rootScope.QuizmaniaSpeedRound.pause();
            $rootScope.QuizmaniaSpeedRound.load();
            if(refreshIntervalId != null){
                toastr.remove();
                $scope.countTimer = 20;
                answerBlocked = false;
                clearInterval(refreshIntervalId);
                //GameService.setFinishGame();
            }
            $scope.question = null;
            $rootScope.game = null;
        });

    })
