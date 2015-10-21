(() => {
	'use strict';

	angular.module('SimpleQuiz')
		.directive('quiz', quizView);

		function quizView() {
			const directiveConfig = {
				scope: {},
				templateUrl: 'src/js/app/views/quiz/quizTemplate.html',
				controller: quizViewController,
				controllerAs: 'vm'
			};

			quizViewController.$inject = ['$state', '$stateParams', 'QuizService', 'ScoreService'];
			function quizViewController($state, $stateParams, QuizService, ScoreService) {
					const vm = this;

					let answers = [];

					vm.allQuestions = [];
					vm.questionNavIndex = 0;

					vm.checkAnswer = checkAnser;
					vm.getCorrectIndex = index => index + 1;
					vm.submitButton = submitButton;

					activate();

					function activate() {
						return getQuiz($stateParams.quizId)
							.then(() => {
							});
					}

					function test() {
						answers = [{0: 1}, {1:1}, {2:2}];
					}

					function checkAnser(choice, question) {
						test();
						console.log(answers);
						answers
							.filter(answer => answer.question !== question)
							.push({question: question, choice: choice});

						console.log(answers);
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

			return directiveConfig;
		}
})();
