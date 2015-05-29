var WelcomeCtrl = function($location) {
  var welcome = this;

  this.startQuiz = function() {
    $location.path('/quiz/3dgdd');
  };
};

module.exports = WelcomeCtrl;
