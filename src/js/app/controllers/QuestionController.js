app.controller('QuestionController', ['$http', '$scope', '$location', function($http, $scope, $location){
  
  var question = this;
  question.allQuestions = [];
  question.questionNavIndex = 0;

  $scope.answersArray = [];
  
  var radioButtonGroupName = 'input[name=group-' + question.questionNavIndex + ']';
  var radioButtonGroup = $(radioButtonGroupName);

  $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
    data.questions.forEach(function(element){
      question.allQuestions.push(element);
      console.log('Done');
    });

    question.allQuestionsLength = question.allQuestions.length;
  });
  
  function _setPreviousAnswer() {
    if(question.allQuestions[question.questionNavIndex].selectedAnswer) {
      console.log("true");
      var choiceTag = '#' + question.allQuestions[question.questionNavIndex].selectedAnswer;
      console.log(choiceTag);
      console.log($(choiceTag));
      $(choiceTag).prop('checked', 'checked');
    }
  }
        
  question.nextButton = function() {
    if(question.questionNavIndex === question.allQuestionsLength) {
      $location.path('/score');
    }
    
    else {
      if (question.allQuestions[question.questionNavIndex].selectedAnswer || 
          question.allQuestions[question.questionNavIndex].selectedAnswer === 0) {
        question.questionNavIndex++;
      } 
      
      else {
        alert("Please select an answer");
      }
      
    }
  };
        
  question.backButton = function() {
    question.questionNavIndex--;
     _setPreviousAnswer();
  };
  
  //Using this instead of $scope returns the controller instead of the element. I hope I can find a way to stop using $scope,
  //but for now, this works. Sorry future me!
  $scope.isSelected = function() {
    question.allQuestions[question.questionNavIndex].selectedAnswer = this.$index;
    
    if (question.questionNavIndex > -1) {
      $scope.answersArray.splice(question.questionNavIndex, 1);
      $scope.answersArray.push(question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    else {
    $scope.answersArray.push(question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    console.log($scope.answersArray);
  };
}]);
