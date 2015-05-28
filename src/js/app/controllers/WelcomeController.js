var WelcomeCtrl = function($location) {
  var welcome = this;

  this.startQuiz = function() {
    $location.path('/quiz');
  };
};

module.exports = WelcomeCtrl;
