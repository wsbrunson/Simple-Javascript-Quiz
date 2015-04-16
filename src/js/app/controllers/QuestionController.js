app.controller('QuestionController', ['$http', '$scope', '$location', function($http, $scope, $location){
  
  $scope.allQuestions = [];
  $scope.questionNavIndex = 0;
  
  var radioButtonGroupName = 'input[name=group-' + $scope.questionNavIndex + ']';
  var radioButtonGroup = $(radioButtonGroupName);

  $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
    data.questions.forEach(function(element){
      $scope.allQuestions.push(element);
      console.log('Done');
    });

    $scope.allQuestionsLength = $scope.allQuestions.length;
  });
  
  function _setPreviousAnswer() {
    if($scope.allQuestions[$scope.questionNavIndex].selectedAnswer) {
      var choiceTag = '#' + $scope.allQuestions[$scope.questionNavIndex].selectedAnswer;
      $(choiceTag).attr('checked');
    }
  }
        
  $scope.nextButton = function() {
    if($scope.questionNavIndex >= $scope.allQuestionsLength) {
      $location.path('/score');
    }
    
    else {
    if ($scope.allQuestions[$scope.questionNavIndex].selectedAnswer || $scope.allQuestions[$scope.questionNavIndex].selectedAnswer === 0) {
      $scope.questionNavIndex++;
    } 
/*
    else {
      alert("Please select an answer");
    }*/
    }
  };
        
  $scope.backButton = function() {
    $scope.questionNavIndex--;
     _setPreviousAnswer();
  };
  
  $scope.isSelected = function() {
    $scope.allQuestions[$scope.questionNavIndex].selectedAnswer = this.$index;
  };
}]);
