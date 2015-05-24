app.controller('WelcomeController', function($location) {
  
  var welcome = this;

  this.startQuiz = function() {
    $location.path('/quiz');
  };
});