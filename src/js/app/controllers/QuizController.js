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
