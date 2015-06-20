function ScoreFactory(QuizFactory) {
  'use strict';

  var service = {};
  var score   = 0;

  function getInputGroup(length) {
    var groupArray = [];

    for(var i = 0; i < length; i++) {
      var groupName = "group-" + i;
      var groupOfInputs = document.getElementsByName(groupName);
      var inputArray = [];

      for(var j = 0; j < groupOfInputs.length; j++) {
        var input = groupOfInputs[j];
        inputArray.push(input);
      }

      groupArray.push(inputArray);
    }

    return groupArray;
  }

  function checkRadioButtons(array) {
    var quizValidated = false;

    array.forEach(function(group) {
      var radioChecked = 0;

      group.some(function(input) {
        if(input.checked === true) {
          //console.log('Input ', input.id, ' is checked');
          radioChecked++;
          return true;
        }

      });

      if(radioChecked === 0) {
        quizValidated = false;
      }

      else {
        radioChecked = 0;
        quizValidated = true;
      }
    });
    return quizValidated;
  }

  function scoreQuiz(array) {
    array.forEach(function(group, index) {
      var correctAnswer = QuizFactory.getCorrectAnswer(index);
      //console.log("correct answer: ", correctAnswer);
      group.forEach(function(input, answer) {
        if (input.checked && answer === correctAnswer) {
          //console.log('The input ', input.id, ' was correctly selected');
          score++;
          //console.log('Current score: ', score);
        }
      });
    });
    //console.log("Final score: ", score);
  }

  service.runScoreQuiz = function() {
    scoreQuiz(getInputGroup(QuizFactory.getQuizLength()));
  };

  service.validateQuiz = function() {
    return checkRadioButtons(getInputGroup(QuizFactory.getQuizLength()));
  };

  service.getScore = function() {
    return score;
  };

  service.resetScore = function() {
    score = 0;
  };

  return service;
}

module.exports = ScoreFactory;
