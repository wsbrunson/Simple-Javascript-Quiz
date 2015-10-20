function quizView() {
	'use strict';

	const directiveConfig = {
		scope: {},
		templateUrl: 'src/js/app/views/quiz/quizTemplate.html',
		controller: quizViewController,
		controllerAs: 'vm',
		link: link
	};

	quizViewController.$inject = ['$state', '$stateParams', 'QuizService', 'ScoreService'];
	function quizViewController($state, $stateParams, QuizService, ScoreService) {
			const vm = this;

			vm.allQuestions = [];
			vm.questionNavIndex = 0;

			vm.submitButton = submitButton;

			activate();

			function activate() {
				return getQuiz($stateParams.quizId)
					.then(() => {
					});
			}

			function getQuiz(id) {
				return QuizService.getQuiz(id)
					.then(quiz => {
						vm.allQuestions = quiz;
						return vm.allQuestions;
					});
			}

			function submitButton() {
				const pass = ScoreService.validateQuiz();

				if(pass) {
					ScoreService.runScoreQuiz();
					$state.go('score');
				} else {
					alert('Please answer all questions before continuing');
				}
			}
	}

	function link() {}

	return directiveConfig;
}

module.exports = quizView;
