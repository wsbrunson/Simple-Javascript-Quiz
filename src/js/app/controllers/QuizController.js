function QuizCtrl($http, $scope, $location, $routeParams, QuizFactory, ScoreFactory) {
  'use strict';

  var quiz = this;

  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;

  QuizFactory.setQuizCode($routeParams.quizId);

  QuizFactory.callJson()
    .then(function(data) {
      //console.log('data from QuizFactory: ', data);
      data.forEach(function(element) {
        quiz.allQuestions.push(element);
      });
      //console.log('quiz.allQuestions', quiz.allQuestions);

    });

  quiz.submitButton = function() {
    //console.log("The quiz is validated: ", ScoreFactory.validateQuiz());
    var pass = ScoreFactory.validateQuiz();

    if(pass) {
      ScoreFactory.runScoreQuiz();
      $location.path('/score');
    }

    else {
      alert('Please answer all questions before continuing');
    }
  };
}

module.exports = QuizCtrl;
