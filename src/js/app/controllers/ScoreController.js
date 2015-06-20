function ScoreCtrl ($scope, $location, ScoreFactory) {
  'use strict';
  this.score = ScoreFactory.getScore();

  this.retakeQuiz = function() {
    ScoreFactory.resetScore();
    $location.path('/');
  };
}

module.exports = ScoreCtrl;
