var app = angular
  .module('SimpleQuiz', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/welcome.html',
          controller: 'WelcomeController'
        })
        .when('/quiz', {
          templateUrl: 'views/quiz.html',
          controller: 'QuizController',
          controllerAs: 'quiz'
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
  });

  var _validateQuiz = function() {
    for(var i = 0; i < quiz.allQuestionsLength; i++) {
      var group = 'input[name=group-' + i + ']:checked';

      if ($(group).length === 0) {
        return false;
      }
    }

    return true;
  };

  var _scoreQuiz = function() {
    var numberOfCorrectAnswers = 0;

    for(var i = 0; i < quiz.allQuestionsLength; i++) {
      var answer = quiz.allQuestions[i].correctAnswer;
      var answerToCheck = '#' + i + '-' + answer + ':checked';

      if($(answerToCheck).length > 0) {
        numberOfCorrectAnswers++;
      }
    }

    return numberOfCorrectAnswers;
  };

  quiz.submitButton = function() {
    if(_validateQuiz()) {
      $scope.quizScore = _scoreQuiz();
      console.log($scope.quizScore);
      $location.path('/score');
    }

    else {
      alert('Please answer all questions before conintuing');
    }
  };
}]);

app.controller('ScoreController', ['$scope', '$location', function($scope, $location) {
  
  var score = this;
  
  score.retakeQuiz = function() {
    
    console.log('click');
    $scope.answersArray = [];
    
    $location.path('/');
    
  };
  
}]);
app.controller('WelcomeController', function($scope, $location) {
  
  $scope.startQuiz = function() {
    return $location.path('/quiz');
  };
});