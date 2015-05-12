var app = angular
  .module('SimpleQuiz', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/welcome.html',
          controller: 'WelcomeController'
        })
        .when('/questions', {
          templateUrl: 'views/questions.html',
          controller: 'QuestionController',
          controllerAs: 'question'
        })
        .when('/score', {
          templateUrl: 'views/score.html',
          controller: 'ScoreController',
          controllerAs: 'score'
        })
        .otherwise({
          redirectTo: '/'
        });
});

app.controller('QuestionController', ['$http', '$scope', '$location', function($http, $scope, $location){
  
  var question = this;
  
  question.allQuestions = [];
  question.questionNavIndex = 0;

  $scope.answersArray = [];

  $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
    data.questions.forEach(function(element){
      question.allQuestions.push(element);
    });

    question.allQuestionsLength = question.allQuestions.length;
  });
  
  function _setPreviousAnswer() {
    
    if(question.allQuestions[question.questionNavIndex].selectedAnswer) {
      
      var choiceTag = '#' + question.allQuestions[question.questionNavIndex]
                              .selectedAnswer;
      $(choiceTag).prop('checked', 'checked');
      
    }
    
  }
        
  question.nextButton = function() {
    
    if(question.questionNavIndex === question.allQuestionsLength - 1) {
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
  
  question.isSelected = function(index) {
    console.log('click');

    question.allQuestions[question.questionNavIndex].selectedAnswer = index;
    
    if (question.questionNavIndex > -1) {
      $scope.answersArray
        .splice(question.questionNavIndex, 
                1, 
                question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    
    else {
      $scope.answersArray
        .push(question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    
  };
  
}]);

app.controller('ScoreController', ['$scope', '$location', function($scope, $location) {
  
  var score = this;
  
  score.totalScore = 7;
  
  score.retakeQuiz = function() {
    
    console.log('click');
    $scope.answersArray = [];
    
    $location.path('/');
    
  };
  
}]);
app.controller('WelcomeController', function($scope, $location) {
  
  $scope.startQuiz = function() {
    return $location.path('/questions');
  };
});