describe('Score Component: ', function() {
	var dirController;
	var element;
	var scope;

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

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.inputData = quizData;

		element = $compile('<score></score>')(scope);

		scope.$apply();

		dirController = element.controller('score');
	}));

	it('Should compile without error', function() {
		expect(element).toBeTruthy();
		expect(dirController).toBeTruthy();
	});
});
