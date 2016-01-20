function score() {
	'use strict';

	var directiveConfig = {
		scope: {},
		template: template,
		controller: scoreViewController,
		controllerAs: 'vm'
	};

	scoreViewController.$inject = ['$state', 'QuizService'];
	function scoreViewController($state, QuizService) {
			const vm = this;

			vm.score = QuizService.getQuizScore();
			vm.retakeQuiz = retakeQuiz;

			function retakeQuiz() {
				QuizService.setQuizScore(0);
				$state.go('quiz', {quizId: QuizService.getQuizId()});
			}
	}

	return directiveConfig;
}

export default score;

const template = `
	<div class="score">
		<h2 class='score__title'>Quiz Complete!</h2>
			<p class='score__total'>Your total score is: <span class='score--number'>{{ vm.score }}</span></p>

		<div class='end-div-buttons'>
			<button id='retake-button' class='button end-buttons' ng-click='vm.retakeQuiz()'>Retake Quiz</button>
			<button id='show-button' class='button end-buttons'>Show Answers</button>
		</div>
	</div>`;
