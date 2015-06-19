function QuizCtrl($http, $scope, $location, $routeParams, QuizFactory, ScoreFactory) {
  'use strict';

  var quiz = this;

  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;

  QuizFactory.setQuizCode($routeParams.quizId);

  QuizFactory.callJson()
    .then(function(data) {
      console.log('data from QuizFactory: ', data);
      data.forEach(function(element) {
        quiz.allQuestions.push(element);
      });
      console.log('quiz.allQuestions', quiz.allQuestions);
    });

  quiz.submitButton = function() {
    var pass = ScoreFactory.validateQuiz();

    console.log("pass", pass);
    if (pass) {
      ScoreFactory.scoreQuiz();
      console.log("quiz score: ", ScoreFactory.getScore);
      $location.path('/score');
    } else {
      alert("Please anwer all questions before moving on");
    }
  };
}

module.exports = QuizCtrl;
