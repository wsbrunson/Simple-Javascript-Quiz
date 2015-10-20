function questionComponent() {
	var directiveConfig = {
		scope: {
			data: '&'
		},
		template: [ '<div class="quiz__question-container" ng-repeat="questionItem in allQuestions track by $index">',
									'<h3 class="quiz__question">Question <span>{{ questionItem.questionNumber + 1 }}</h3>',
									'<p class="quiz__question-copy">{{ questionItem.question }}</p>',
									'<div ng-repeat="choice in questionItem.choices">',
										'<input id="{{ questionItem.questionNumber + - + $index }}" type="radio" name="group-{{ questionItem.questionNumber }}">',
										'<label for="{{ questionItem.questionNumber + - + $index }}" class="quiz__choice"><span></span>{{ questionItem.questionNumber }}. {{ choice }}</label>',
									'</div>',
								'</div>'].join(''),
		controller: questionComponentController,
		link: link
	};

	function questionComponentController() {
		console.log('controller online');
	}

	function link(scope) {
		scope.allQuestions = scope.data();
		console.log(scope);
	}

	return directiveConfig;
}


module.exports = questionComponent;
