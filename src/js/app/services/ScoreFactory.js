function ScoreFactory() {
  'use strict';

  var service = {};
  var numberOfCorrectAnswers = 0;

  service.validateQuiz = function() {
    for (var i = 0; i < 7; i++) {
      var group = 'input[name=group-' + i + ']:checked';
      console.log(group);

      if ($(group).length === 0) {
        console.log(false);
        return false;
      }
    }

    return true;
  };

  service.test = 300;

  service.getScore = function() {
    return numberOfCorrectAnswers;
  };

  service.resetScore = function() {
    numberOfCorrectAnswers = 0;
  };

  service.scoreQuiz = function() {
    for (var i = 0; i < quiz.allQuestionsLength; i++) {
      var answer = quiz.allQuestions[i].correctAnswer;
      var answerToCheck = '#' + i + '-' + answer + ':checked';

      if ($(answerToCheck).length > 0) {
        numberOfCorrectAnswers++;
      }
    }
  };

  return service;
}

module.exports = ScoreFactory;
