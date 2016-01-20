	function questionsComponent() {
	'use strict';

	const directiveConfig = {
		scope: {},
		bindToController: {
			inputData: '&',
			addSelection: '&'
		},
		template: template,
		controller: questionController,
		controllerAs: 'vm'
	};

	function questionController() {
		const vm = this;

		vm.addSelection = vm.addSelection();
		vm.questions = vm.inputData().quizData;

		vm.correctIndex = (num) => num + 1;
	}

	return directiveConfig;
}

export default questionsComponent;

const template = `
	<div class="quiz__question-container" ng-repeat="questionItem in vm.questions track by $index">
		<h3 class="quiz__question">Question {{ vm.correctIndex($index) }}</h3>
			<p class="quiz__question-copy">{{ questionItem.question }}</p>
			<div ng-repeat="choice in questionItem.choices track by $index">
				<input ng-click="vm.addSelection({question: $parent.$index, choice: $index})"
					id="{{ $index }}-{{ $parent.$index }}"
					type="radio" name="group-{{ $parent.$index }}">
				<label for="{{ $index }}-{{ $parent.$index }}"
					class="quiz__choice"><span></span>{{ vm.correctIndex($index) }}. {{ choice }}</label>
			</div>
	</div>`;
