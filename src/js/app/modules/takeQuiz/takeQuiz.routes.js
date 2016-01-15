routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('quiz', {
			url: '/quiz/:quizId',
			template: '<take-quiz>',
			resolve: {
				quizData: ['QuizService', '$stateParams', function(QuizService, $stateParams) {
					return QuizService.getQuiz($stateParams.quizId);
				}]
			},
			controller: ['$scope', 'quizData', function($scope, quizData) {
				$scope.quizData = quizData;
			}]
		})
		.state('score', {
			url: '/score',
			template: '<score></score>'
		});
}
