describe('takeQuiz Component', function() {
	var dirController;
	var element;
	var scope;
	var state;
	var rootScope;
	var ValidateAndScoreQuiz;

	const questionOne = {
		'question': 'Grand Central Terminal, Park Avenue, New York is the world\'s',
		'choices': [{'answer': 'largest railway station'},
			{'answer': 'highest railway station'},
			{'answer': 'longest railway station'},
			{'answer': 'None of the above'}],
		'correctAnswer': 0
	};
	
	const quizData = [questionOne];

	beforeEach(module('SimpleQuiz'));

	beforeEach(inject(function($rootScope, $compile, $state, _ValidateAndScoreQuiz_) {
		ValidateAndScoreQuiz = _ValidateAndScoreQuiz_;
		rootScope = $rootScope;
		state = $state;
		scope = rootScope.$new();

		scope.$parent.quizData = quizData;

		element = $compile('<take-quiz>')(scope);
		scope.$apply();
		dirController = element.controller('takeQuiz');
	}));

	it('Should compile without error', function() {
		expect(element).toBeTruthy();
		expect(dirController).toBeTruthy();
	});

	describe('takeQuiz Component: submitButton', function() {

		it('should prevent state change if quiz is invalid', function() {
			spyOn(ValidateAndScoreQuiz, 'validateQuiz').and.returnValue(false);
            spyOn(state, 'go');

			dirController.submitButton();
            expect(state.go).not.toHaveBeenCalled();
		});
	});
});
