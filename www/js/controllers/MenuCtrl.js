angular.module('app.menu', [])
.controller('MenuCtrl', function($rootScope) {
    $rootScope.audioTexte = "Muet ";
    $rootScope.audioIcon = "ion-volume-mute";
    var audios = ["audio/IntroRemix.mp3","audio/Quizmania - Summer.mp3","audio/IntroRemix.mp3","audio/Quizmania - Summer.mp3"];
    var id = Math.floor(Math.random() * 3) + 1 ;

    var goodAnswerSound = "audio/xylophone_affirm.wav";
    $rootScope.goodAnswerSound = new Audio(goodAnswerSound);

    var shortWhooshSound ="audio/short_whoosh.wav";
    $rootScope.shortWhooshSound = new Audio(shortWhooshSound);

    var shortWhooshSound1 ="audio/short_whoosh1.wav";
    $rootScope.shortWhooshSound1 = new Audio(shortWhooshSound1);

    var shortWhooshSound2 ="audio/short_whoosh2.wav";
    $rootScope.shortWhooshSound2 = new Audio(shortWhooshSound2);

    var Round_Complete ="audio/Round_Complete.mp3";
    $rootScope.Round_Complete = new Audio(Round_Complete);

    var WaitingTheOther ="audio/Quizmania - Disco.mp3";
    $rootScope.WaitingTheOther = new Audio(WaitingTheOther);

    var QuizmaniaSpeedRound ="audio/Quizmania - Speed Round.mp3";
    $rootScope.QuizmaniaSpeedRound = new Audio(QuizmaniaSpeedRound);

    var pad_confirm ="audio/pad_confirm.wav";
    $rootScope.pad_confirm = new Audio(pad_confirm);

    var popDrip ="audio/pop_drip.wav";
    $rootScope.popDrip = new Audio(popDrip);

    var music_marimba_chord ="audio/music_marimba_chord.wav";
    $rootScope.music_marimba_chord = new Audio(music_marimba_chord);

    var jar_deny ="audio/jar_deny.wav";
    $rootScope.jar_deny = new Audio(jar_deny);

    var OnGame ="audio/OnGame.mp3";
    $rootScope.OnGame = new Audio(OnGame);

    var chime_bell_ding ="audio/chime_bell_ding.wav";
    $rootScope.chime_bell_ding = new Audio(chime_bell_ding);

    $rootScope.toggleSound = function(){
        $rootScope.audio = ($rootScope.audio == null)? new Audio(audios[id]) : $rootScope.audio;

        if($rootScope.audio.paused || $rootScope.audio.volume == 0){
            $rootScope.audioTexte = "Muet ";
            $rootScope.audioIcon = "ion-volume-mute";
            $rootScope.audio.play();
            $rootScope.audio.volume = 0.2;
            $rootScope.audio.loop = true
        }
        else{
            $rootScope.audioTexte = "Son ";
            $rootScope.audioIcon = "ion-volume-high";
            // $rootScope.audio.pause();
            $rootScope.audio.volume = 0;
        }
    }
    $rootScope.toggleSound();
});
