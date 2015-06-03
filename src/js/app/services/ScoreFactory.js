function ScoreFactory () {
  'use strict';

  var $ = require('jquery');
  var service = {};

  function _validateQuiz() {
    for (var i = 0; i < quiz.allQuestionsLength; i++) {
      var group = 'input[name=group-' + i + ']:checked';

      if ($(group).length === 0) {
        return false;
      }
    }

    return true;
  }

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
  }
}

module.exports = ScoreFactory;
