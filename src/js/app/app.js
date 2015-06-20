//3rd Party Packages
var angular      = require('angular');
var angularRoute = require('angular-route');
var $ = require('jquery');

//Controllers
var QuizCtrl    = require('./controllers/QuizController.js');
var ScoreCtrl   = require('./controllers/ScoreController.js');
var WelcomeCtrl = require('./controllers/WelcomeController.js');

//Services
var QuizFactory  = require('./services/QuizFactory.js');
var ScoreFactory = require('./services/ScoreFactory.js');

//Route
var quizRoutes = require('./routes/route.js');

var app = angular.module('SimpleQuiz', ['ngRoute']);

app.controller('QuizController', ['$http', '$scope', '$location', '$routeParams', 'QuizFactory', 'ScoreFactory', QuizCtrl]);
app.controller('ScoreController', ['$scope', '$location', 'ScoreFactory', ScoreCtrl]);
app.controller('WelcomeController', ['$location', WelcomeCtrl]);

app.factory('QuizFactory', ['$http', '$q', QuizFactory]);
app.factory('ScoreFactory', ['QuizFactory', ScoreFactory]);

app.config(['$routeProvider', quizRoutes]);
