describe('questionsComponent', function() {
	var dirController;
	var dirScope;
	var element;
	var scope;

	beforeEach(module('SimpleQuiz'));

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.inputData = [{question: 'What is?', choice: ['a', 'b', 'c', 'd'], correctAnswer: '2'}];
		scope.checkAnswer = function() {};

		element = $compile('<questions inputData="inputData" checkAnswer="checkAnswer"></questions>')(scope);
		scope.$apply();

		dirController = element.controller('questions');
		dirScope = element.isolateScope();
	}));

	it('Should compile without error', function() {
		expect(element).toBeTruthy();
		expect(dirController).toBeTruthy();
		expect(dirScope).toBeTruthy();
	});

	xit('Should recieve input data', function() {
		expect(dirController.questions).toBeTruthy();
	});

	xit('Should recieve a check answers function', function() {
		console.log(dirController);
		spyOn(dirController.checkAnswer, 'checkAnswer');
		dirController.checkAnswer();
		expect(dirController.checkAnswer).toHaveBeenCalled();
	});
});
