//3rd Party Packages
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('SimpleQuiz', ['ui.router']);

require('./services');
require('./components');
require('./views');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('home', {
			url: '/',
      template: '<home></home>'
    })
    .state('quiz', {
			url: '/quiz/:quizId',
      template: '<quiz></quiz>'
    })
    .state('score', {
			url: '/score',
      template: '<score></score>'
    });

	$urlRouterProvider.when('', 'home');
	$urlRouterProvider.when('index.html/', 'home');
	$urlRouterProvider.when('/', 'home');

	$urlRouterProvider.otherwise('/');
}]);
