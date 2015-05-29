'use strict';

var QuizCtrl = function ($http, $scope, $location, $routeParams, quizFactory) {
  var $ = require('jquery');
  var quiz = this;
  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;
/*
  function _giveQuizCode() {
    var quizCode = $routeParams.quizId;
    QuizFactory.setQuizCode(quizCode);
    console.log(quizCode);
    console.log(quizFactory.getQuizCode());
  }

  _giveQuizCode();

  function _getQuizData() {
    _giveQuizCode();
    QuizFactory.callJson()
      .then(function (data) {
        data.forEach(function (element, index) {
          element.questionNumber = index;
          quiz.allQuestions.push(element);
        });
      });
  }

  _getQuizData();
*/
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

  function _validateQuiz() {
    for (var i = 0; i < quiz.allQuestionsLength; i++) {
      var group = 'input[name=group-' + i + ']:checked';

      if ($(group).length === 0) {
        return false;
      }
    }

    return true;
  };

  function _scoreQuiz() {
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
