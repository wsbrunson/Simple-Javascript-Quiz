app.controller('QuizController', ['$http', '$scope', '$location', function($http, $scope, $location){
  
  var quiz = this;
  
  quiz.allQuestions = [];
  quiz.questionNavIndex = 0;

  $scope.answersArray = [];

  //https://api.myjson.com/bins/3dgdd - array
  //https://api.myjson.com/bins/2i86j - object

  $http.get('https://api.myjson.com/bins/3dgdd').success(function(data) {
    data.forEach(function(element, index){
      element.questionNumber = index;
      quiz.allQuestions.push(element);
    });

    quiz.allQuestionsLength = quiz.allQuestions.length;
    
    var i = 0;
    while(i < 8) {
      console.log(quiz.allQuestions[i]);
      i++;
    }
    
  });
  
  function _setPreviousAnswer() {
    
    if(quiz.allQuestions[quiz.questionNavIndex].selectedAnswer) {
      
      var choiceTag = '#' + quiz.allQuestions[quiz.questionNavIndex]
                              .selectedAnswer;
      $(choiceTag).prop('checked', 'checked');
      
    }
    
  }
        
  quiz.nextButton = function() {
    
    if(quiz.questionNavIndex === quiz.allQuestionsLength - 1) {
      $location.path('/score');
    }
    
    else {
      if (quiz.allQuestions[quiz.questionNavIndex].selectedAnswer || 
          quiz.allQuestions[quiz.questionNavIndex].selectedAnswer === 0) {
        quiz.questionNavIndex++;
      } 
      
      else {
        alert("Please select an answer");
      }

    }
    
  };
        
  quiz.backButton = function() {
    
    quiz.questionNavIndex--;
     _setPreviousAnswer();
     
  };
  
  quiz.isSelected = function(index) {
    console.log('click');

    quiz.allQuestions[quiz.questionNavIndex].selectedAnswer = index;
    
    if (quiz.questionNavIndex > -1) {
      $scope.answersArray
        .splice(quiz.questionNavIndex, 
                1, 
                quiz.allQuestions[quiz.questionNavIndex].selectedAnswer);
    }
    
    else {
      $scope.answersArray
        .push(quiz.allQuestions[quiz.questionNavIndex].selectedAnswer);
    }
    
  };
  
}]);
