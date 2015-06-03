function QuizCtrl($http, $scope, $location, $routeParams, QuizFactory) {
  'use strict';

  var quiz = this;

  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;

  var _giveQuizCode = function () {
    var quizCode = $routeParams.quizId;
    QuizFactory.setQuizCode(quizCode);
  };

  function _getQuizData() {
    _giveQuizCode();
    QuizFactory.callJson()
      .then(function (data) {
        console.log('data from QuizFactory: ', data);
        data.forEach(function (element) {
          quiz.allQuestions.push(element);
        });
        console.log('quiz.allQuestions', quiz.allQuestions);
      });
  }

  _getQuizData();

  quiz.submitButton = function() {
    $location.path('/score');
  };
}

module.exports = QuizCtrl;
