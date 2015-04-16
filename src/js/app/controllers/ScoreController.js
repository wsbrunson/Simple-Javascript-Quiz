app.controller('ScoreController', ['$scope', '$location', function($scope, $location) {
  
  $scope.totalScore = 0;
  
  (function _calculateScore() {
    for(var i; i < $scope.allQuestionsLength; i++) {
      console.log($scope.allQuestions[i].selectedAnswer);
      console.log($scope.allQuestions[i].correctAnswer);
      if($scope.allQuestions[i].selectedAnswer === $scope.allQuestions[i].correctAnswer) {
        $scope.totalScore++;
      }
    }
  })();
}]);