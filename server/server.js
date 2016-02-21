var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var app = express();
var usersList = [];
var gamesList = [];

var quizSimpsons = {};
var quizDisney = {};

initAllQuiz();

app.set('port', process.env.PORT || 9000);
// app.use(express.favicon());
app.use(cors());
app.use(express.bodyParser());
//to load the index.html
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//GET ALL ROUTE 
app.get('/', function(req,res){
    var routesList = [];
    routesList.push('Les différentes routes disponibles de l\'api');
    routesList.push('/getAllRoutes');
    routesList.push('/createUser/:nameUser');
    routesList.push('/createGame/:nameUser/:nameGame/:numberPlayer');
    routesList.push('/joinUserInGame/:nameUser/:nameGame');
    routesList.push('/getQuizSimpsons');
    routesList.push('/getQuizDisney');
    routesList.push('/getAllQuiz');
    routesList.push('/getAllUsers');
    routesList.push('/getAllGames');
    routesList.push('/getGameByName/:nameGame');
    routesList.push('/setGameToFinish/:nameGame');
    res.send(routesList);
});

//  QUIZ AREA
app.get('/getAllQuiz',function(req,res){
    res.setHeader('Cache-Control', 'no-cache');
    res.send(getAllQuiz());
});
app.get('/getQuizSimpsons', function(req, res) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(this.quizSimpsons);
});
app.get('/getQuizDisney', function(req, res) {

    res.setHeader('Cache-Control', 'no-cache');
    res.json(this.quizDisney);
});
app.get('/getQuestionRandom/:idGame/:countQuestion',function(req,res){
    var game = findGameById(req.params.idGame);
    // var questions = [];
    if(req.params.countQuestion != game.countCurrentQuestion){
        game.countCurrentQuestion++;    
    }
    // var randomQuestion = game.questions[Math.floor(Math.random()*questions.length)];
    // var randomQuestion = game.questions[Math.floor(Math.random()*questions.length)];
    res.setHeader('Cache-Control', 'no-cache');
    res.json(game.questions[req.params.countQuestion]);
});


// USER AREA
//route pour créer un utilisateur et le rajouter dans le tableau des users
app.get('/createUser/:nameUser', function(req,res){
  var user = new User(req.params.nameUser);
  usersList.push(user);
  console.log('Nouvel utilisateur : user = '+ user);
  res.send(user);
});
// Route pour récuperer tous les utilisateurs
app.get('/getAllUsers', function(req,res){
  res.send(usersList);
});

// GAME AREA
// Route pour créer un nouveau game
app.get('/createGame/:nameUser/:nameGame/:numberPlayer', function(req,res){
    var game = new Game(req.params.nameGame, req.params.numberPlayer);
    game.usersInGame.push(findUserById(req.params.nameUser));
    gamesList.push(game);
    console.log('Nouvelle partie : game = '+ game);
    res.send(game);
});
// Route pour joindre un utilisateur dans une partie 
app.get('/joinUserInGame/:idUser/:idGame', function(req,res){
    var game = findGameById(req.params.idGame);
    game.usersInGame.push(findUserById(req.params.idUser));
    //Si le nombre de participant et egale au nombre de joeurs prevu dans la partie alors on change le status du jeu a 0 et la partie commence
    if(game.usersInGame.length == game.numberPlayer){
        game.stateGame = 0;
    }
    res.send(game);
});
//Route pour récupéré des informatons sur un game en court
app.get('/getGameByName/:nameGame',function(req,res){
    var game = findGameByName(req.params.nameGame);
    res.send(game);
});
// Route pour récuperer toutes les parties
app.get('/getAllGames', function(req,res){
    res.send(gamesList);
});
// Route pour terminer le jeu en court prend en parametre le nom du jeu en cours et change l'état de la partie
app.get('/setGameToFinish/:nameGame', function(req,res){
    var game = findGameByName(req.params.nameGame);
    if(game != null){
        //on met l'état de la partie a -1 car la partie est terminé
        game.stateGame = -1;
    }
    console.log('La partie courante : game = '+game);
    res.send(game);
});
// Route pour récuperer toutes les parties
app.get('/getAllGamesNotStarted', function(req,res){
    var listGameNotStarted = [];
    for(var i = 0; i < gamesList.length ; i++){
        if(gamesList[i].stateGame == 1){
            listGameNotStarted.push(gamesList[i]);
        }
    }
    res.send(listGameNotStarted);
});

//LUNCH THE SERVER 
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// OBJET METIER
function User(nameUser){
  this.id = nameUser+Date.now();
  this.name = nameUser;
}

function Game(nameGame, numberPlayer){
    this.id = nameGame+Date.now();
    this.name = nameGame;
    this.stateGame = 1; // -1 partie terminé , 0 partie en cours, 1 partie en attente
    this.numberPlayer = numberPlayer;
    this.usersInGame = [];
    this.quizList = [];
    this.questions = getAllQuestions();
    // this.questionsDone = [];
    this.countCurrentQuestion = 0;
}
function Quiz(nameQuiz){
    this.name = nameQuiz;
    this.questions = [];
}
function Question(nameQuestion){
    this.name = nameQuestion;
    this.answers = [];
}
function Answer(answer, weight){
    this.answer = answer;
    this.weight = weight;
}
//                  FUNCTION UTIL                   //

function findUserByName(nameUser){
    for(var i = 0 ; i < usersList.length ; i++){
        if(usersList[i].name === nameUser){
            return usersList[i];
        }
    }
    return null;
}
function findUserById(idUser){
    for(var i = 0 ; i < usersList.length ; i++){
        if(usersList[i].id === idUser){
            return usersList[i];
        }
    }
    return null;
}
function findGameByName(nameGame){
    for(var i = 0 ; i < gamesList.length ; i++){
        if(gamesList[i].name === nameGame){
            return gamesList[i];
        }
    }
    return null;
}
function findGameById(idGame){
    for(var i = 0 ; i < gamesList.length ; i++){
        if(gamesList[i].id === idGame){
            return gamesList[i];
        }
    }
    return null;
}
function getAllQuestions(){
    var allQuiz = getAllQuiz();
    var questions = [];
    for (var i = 0 ; i < allQuiz.length ; i++) {
        for(var j = 0 ; j < allQuiz[i].questions.length ; j++){
            questions.push(allQuiz[i].questions[j])
        }
    }
    return questions.sort();
}
function getAllQuiz(){
    var quizListGlobal = [];
    quizListGlobal.push(this.quizSimpsons);
    quizListGlobal.push(this.quizDisney);
    return quizListGlobal;
}
function initAllQuiz(){ 
    fs.readFile('quizSimpsons.json', function(err, data) {
        this.quizSimpsons = JSON.parse(data);
    });
    fs.readFile('quizDisney.json', function(err, data) {
        this.quizDisney = JSON.parse(data);
    });
}
// function getQuizSimpsons(){
//     if(typeof this.quizSimpsons == 'undefined' || this.quizSimpsons == null){
//         fs.readFile('quizSimpsons.json', function(err, data) {
//         this.quizSimpsons = JSON.parse(data);
//         console.log('dans la condfition')
//     });
//     }
//     return this.quizSimpsons;
// }
// function getQuizDisney(){
//     if(typeof this.quizDisney == 'undefined' || this.quizDisney == null){
//         fs.readFile('quizDisney.json', function(err, data) {
//         this.quizDisney = JSON.parse(data);
//     });
//     }
//     return this.quizDisney;
// }













