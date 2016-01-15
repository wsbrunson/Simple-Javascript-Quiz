function createQuiz() {
	'use strict';

const directiveConfig = {
		scope: {},
		template: template,
		controller: createQuizController,
		controllerAs: 'vm',
		bindToController: true
	};

	createQuizController.$inject = [];
	function createQuizController() {
		const vm = this;
	}

	return directiveConfig;
}

export default createQuiz;

const template = `<div class="quiz-create">
		              <div class="outer-container">Hello</div>
	               </div>`
