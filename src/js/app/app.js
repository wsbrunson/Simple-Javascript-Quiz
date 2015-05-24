var app = angular
  .module('SimpleQuiz', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'src/js/app/views/welcome.html',
          controller: 'WelcomeController',
          controllerAs: 'welcome'
        })
        .when('/quiz', {
          templateUrl: 'src/js/app/views/quiz.html',
          controller: 'QuizController',
          controllerAs: 'quiz'
        })
        .when('/score', {
          templateUrl: 'src/js/app/views/score.html',
          controller: 'ScoreController',
          controllerAs: 'score'
        })
        .otherwise({
          redirectTo: '/'
        });
});
