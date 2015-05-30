function WelcomeCtrl ($location) {
  'use strict';

  var welcome = this;

  welcome.startQuiz = function() {
    $location.path('/quiz/3dgdd');
  };
}

module.exports = WelcomeCtrl;
