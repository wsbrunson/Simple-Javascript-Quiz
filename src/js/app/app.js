'use strict';

//3rd Party Packages
var angular      = require('angular');
var angularRoute = require('angular-route');
var jQuery       = require('../vendor/jquery.min.js');

//Controllers
var QuizCtrl    = require('./controllers/QuizController.js');
var ScoreCtrl   = require('./controllers/ScoreController.js');
var WelcomeCtrl = require('./controllers/WelcomeController.js');

var app = angular.module('SimpleQuiz', ['ngRoute']);

app.controller('QuizController', ['$http', '$scope', '$location', QuizCtrl]);
app.controller('ScoreController', ['$scope', '$location', ScoreCtrl]);
app.controller('WelcomeController', ['$location', WelcomeCtrl]);

app.config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'src/js/app/views/welcome.html',
          controller: 'WelcomeController',
          controllerAs: 'welcome'
        })
        .when('/quiz', {
          templateUrl: 'src/js/app/views/quiz.html',
          controller: 'QuizController',
          controllerAs: 'quiz'
        })
        .when('/score', {
          templateUrl: 'src/js/app/views/score.html',
          controller: 'ScoreController',
          controllerAs: 'score'
        })
        .otherwise({
          redirectTo: '/'
        });
});
