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
