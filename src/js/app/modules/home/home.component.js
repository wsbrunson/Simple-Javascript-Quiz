function homeComponent(QuizService) {
	'use strict';

	const directiveConfig = {
		scope: {},
		template: template,
		controller: homeViewController,
		controllerAs: 'vm'
	};

	homeViewController.$inject = ['$state'];
	function homeViewController($state) {
		const vm = this;

            vm.createQuizButton = createQuizButton;
			vm.startQuizButton = startQuizButton;
            
            function createQuizButton() {
                $state.go('createQuiz');
            }

			function startQuizButton() {
				$state.go('quiz', {quizId: '5clco'});
			}
	}

	return directiveConfig;
}

export default homeComponent;

const template = `<div class='welcome'>
                    <h1 class='welcome__title'>Quiz Simply</h1>
                    <h3 class='welcome__description'>Create simple quizzes. Take simply quizzes. Continue living simply.</h3>

                    <div class='welcome__take-quiz'>
                        <h4 class='welcome__container-title'>Take a Quiz</h4>
                        <label>Enter the ID of the quiz you would like to take</label>
                        <input class='welcome__take-input' type='text'>
                        <button class="button welcome__button" ng-click="vm.startQuizButton()">Start Quiz!</button>
                    </div>

                    <div class='welcome__create-quiz'>
                        <h4 class='welcome__container-title'>Create a Quiz</h4>
                        <label>Enter the ID of the quiz you would like to take</label>
                        <button class="button welcome__button" ng-click="vm.createQuizButton()">Create Quiz!</button>
                    </div>
                  </div>`
