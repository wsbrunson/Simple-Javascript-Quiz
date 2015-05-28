var ScoreCtrl = function($scope, $location) {
  var score = this;
  
  score.retakeQuiz = function() {
    
    console.log('click');
    $scope.answersArray = [];
    
    $location.path('/');
    
  };
};

module.exports = ScoreCtrl;
