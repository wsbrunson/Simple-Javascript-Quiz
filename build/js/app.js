'use strict';

//Angular packages
var angular   = require('angular');
var angularUi = require('angular-ui-router');

//Controllers
var QuizCtrl = require('./controllers/QuizController.js');
var ScoreCtrl = require('./controllers/ScoreController.js');
var WelcomeCtrl = require('./controllers/WelcomeController.js');

var app = angular
  .module('SimpleQuiz', ['ngRoute'])
    .config(function($routeProvider) {
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

app.controller('QuizController', ['$http', '$scope', '$location', QuizCtrl]);
app.controller('ScoreController', ['$scope', '$location', ScoreCtrl]);
app.controller('WelcomeController', ['$location', WelcomeCtrl]);

'use strict';

var QuizCtrl = function($http, $scope, $location){
  var quiz = this;
  console.log($location.$$path);
  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;

  $scope.quizScore = 0;

  //https://api.myjson.com/bins/3dgdd - array
  //https://api.myjson.com/bins/2i86j - object

  $http.get('https://api.myjson.com/bins/3dgdd').success(function(data) {
    data.forEach(function(element, index){
      element.questionNumber = index;
      quiz.allQuestions.push(element);
    });

    quiz.allQuestionsLength = quiz.allQuestions.length;
  });

  var _validateQuiz = function() {
    for(var i = 0; i < quiz.allQuestionsLength; i++) {
      var group = 'input[name=group-' + i + ']:checked';

      if ($(group).length === 0) {
        return false;
      }
    }

    return true;
  };

  var _scoreQuiz = function() {
    var numberOfCorrectAnswers = 0;

    for(var i = 0; i < quiz.allQuestionsLength; i++) {
      var answer = quiz.allQuestions[i].correctAnswer;
      var answerToCheck = '#' + i + '-' + answer + ':checked';

      if($(answerToCheck).length > 0) {
        numberOfCorrectAnswers++;
      }
    }

    return numberOfCorrectAnswers;
  };

  quiz.submitButton = function() {
    if(_validateQuiz()) {
      $scope.quizScore = _scoreQuiz();
      console.log($scope.quizScore);
      $location.path('/score');
    }

    else {
      alert('Please answer all questions before conintuing');
    }
  };
};

module.exports = QuizCtrl;

var ScoreCtrl = function($scope, $location) {
  var score = this;
  
  score.retakeQuiz = function() {
    
    console.log('click');
    $scope.answersArray = [];
    
    $location.path('/');
    
  };
};

module.exports = ScoreCtrl;

var WelcomeCtrl = function($location) {
  var welcome = this;

  this.startQuiz = function() {
    $location.path('/quiz');
  };
};