app.controller('QuestionController', ['$http', '$scope', function($http, $scope){

  $scope.allQuestions = [];
  $scope.questionNavIndex = 0;

  $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
    data.questions.forEach(function(element){
      $scope.allQuestions.push(element);
      console.log('Done');
    });

    $scope.allQuestionsLength = $scope.allQuestions.length;
  });
        
  $scope.nextButton = function() {
    var radioButtonGroupName = 'input[name=' + $scope.questionNavIndex + ']'
    var radioButtons = $(radioButtonGroupName);

    if ( !radioButtons.filter(':checked').length ) {
      alert("Please select an answer");
    } 

    else {
      $scope.questionNavIndex++;
    }

    
  };
        
  $scope.backButton = function() {
    $scope.questionNavIndex--;
  };
}]);
