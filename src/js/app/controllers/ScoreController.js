app.controller('ScoreController', ['$scope', '$location', function($scope, $location) {
  
  var score = this;
  
  score.totalScore = 7;
  
  score.retakeQuiz = function() {
    
    console.log('click');
    $scope.answersArray = [];
    
    $location.path('/');
    
  };
  
}]);