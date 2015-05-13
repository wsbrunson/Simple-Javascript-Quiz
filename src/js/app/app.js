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
