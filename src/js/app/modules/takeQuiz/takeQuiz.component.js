function takeQuiz() {
	'use strict';

const directiveConfig = {
		scope: {},
		template: template,
		controller: takeQuizController,
		controllerAs: 'vm',
		bindToController: true
	};

	takeQuizController.$inject = ['$scope', '$state', 'PrepareQuizAnswers', '$stateParams', 'ValidateAndScoreQuiz'];
	function takeQuizController($scope, $state, PrepareQuizAnswers, $stateParams, ValidateAndScoreQuiz) {
		const vm = this;

		// How to get around resolves with components. Data comes from controller in
		// the takeQuiz.routes.js file. Hacky, hopefully will be fixed in 1.5
		vm.allQuestions = $scope.$parent.quizData;

		vm.addSelectionToAnswers = PrepareQuizAnswers.addSelectionToAnswers;
		vm.getCorrectIndex = index => index + 1;
		vm.submitButton = submitButton;

		function submitButton() {
			const pass = ValidateAndScoreQuiz.validateQuiz(PrepareQuizAnswers.getSelections());

			if(pass) {
				$state.go('score');
			} else {
				alert('Please answer all questions before continuing');
			}
		}
	}

	return directiveConfig;
}

export default takeQuiz;

const template = [
	'<div class="quiz">',
		'<div class="outer-container">',
			'<questions input-data="vm.allQuestions" add-selection="vm.addSelectionToAnswers">',
		'</div>',
		'<div class="quiz__buttons-container">',
			'<button class="button quiz__button" ng-click="vm.submitButton()">Submit</button>',
			'</div>',
	'</div>'].join('');
