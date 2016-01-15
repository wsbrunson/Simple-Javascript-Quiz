describe('home Component', function() {
	var dirController;
	var element;
	var scope;
	var state;
	var rootScope;

	beforeEach(module('SimpleQuiz'));

	beforeEach(inject(function($rootScope, $compile, $state) {
		rootScope = $rootScope;
		state = $state;
		scope = rootScope.$new();

		element = $compile('<home>')(scope);
		scope.$apply();
		dirController = element.controller('home');
	}));

	it('Should compile without error', function() {
		expect(element).toBeTruthy();
		expect(dirController).toBeTruthy();
	});

	describe('startQuizButton()', function() {

		it('should change state to start quiz', function() {
            spyOn(state, 'go');

			dirController.startQuizButton();
            expect(state.go).toHaveBeenCalledWith('quiz', {quizId: '5clco'});
		});
	});
    
    describe('createQuizButton()', function() {

		it('should change state to create quiz', function() {
            spyOn(state, 'go');

			dirController.createQuizButton();
            expect(state.go).toHaveBeenCalled();
		});
	});
});
