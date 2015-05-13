app.controller('WelcomeController', function($scope, $location) {
  
  $scope.startQuiz = function() {
    return $location.path('/quiz');
  };
});