//3rd Party Packages
var angular      = require('angular');
var angularRoute = require('angular-route');

//Controllers
var QuizCtrl    = require('./controllers/QuizController.js');
var ScoreCtrl   = require('./controllers/ScoreController.js');
var WelcomeCtrl = require('./controllers/WelcomeController.js');

//Services
var QuizFactory = require('./services/QuizFactory.js');

//Route
var quizRoutes = require('./routes/route.js');

var app = angular.module('SimpleQuiz', ['ngRoute']);

app.controller('QuizController', ['$http', '$scope', '$location', '$routeParams', 'QuizFactory', QuizCtrl]);
app.controller('ScoreController', ['$scope', '$location', ScoreCtrl]);
app.controller('WelcomeController', ['$location', WelcomeCtrl]);

app.factory('QuizFactory', ['$http', '$q', QuizFactory]);

app.config(quizRoutes);
