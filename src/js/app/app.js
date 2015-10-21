angular.module('SimpleQuiz', ['ui.router']);

angular.module('SimpleQuiz')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
