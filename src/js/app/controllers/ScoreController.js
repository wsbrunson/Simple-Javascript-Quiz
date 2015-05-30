function ScoreCtrl ($scope, $location) {
  'use strict';
  var score = this;

  score.retakeQuiz = function() {

    console.log('click');
    $scope.answersArray = [];

    $location.path('/');

  };
}

module.exports = ScoreCtrl;
