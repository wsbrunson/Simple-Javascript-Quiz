function WelcomeCtrl ($location) {
  'use strict';

  var welcome = this;

  welcome.startQuiz = function() {
    $location.path('/quiz/5clco');
  };
}

module.exports = WelcomeCtrl;
