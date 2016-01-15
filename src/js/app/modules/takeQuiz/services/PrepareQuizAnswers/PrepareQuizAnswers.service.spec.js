describe('PrepareQuizAnswers', function() {
	var PrepareQuizAnswers;

	const questionZeroAnswerOne = {question: 0, choice: 1};
	const questionZeroAnswerTwo = {question: 0, choice: 2};
	const questionOneAnswerOne = {question: 1, choice: 1};
	const questionOneAnswerTwo = {question: 1, choice: 2};

	beforeEach(function() {
		module('takeQuizServices');
	});

	beforeEach(inject(function(_PrepareQuizAnswers_) {
		PrepareQuizAnswers = _PrepareQuizAnswers_;
	}));

	it('should initialize', function() {
		expect(PrepareQuizAnswers).toBeTruthy();
	});

	describe('PrepareQuizAnswers Service: addSelectionToAnswers', function() {
		it('should return an array with a single object when supplied with a selection', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			expect(PrepareQuizAnswers.getSelections()).toEqual({0: 1});
		});

		it('should return an array with two objects when supplied with two questions', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			PrepareQuizAnswers.addSelectionToAnswers(questionOneAnswerOne);

			expect(PrepareQuizAnswers.getSelections()).toEqual({0: 1, 1: 1});
		});

		it('should replace elements with new additions if their questions match', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerTwo);

			expect(PrepareQuizAnswers.getSelections()).toEqual({0: 2});
		});

		it('should replace elements with new additions if their questions match and keep other elements who are unique', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			PrepareQuizAnswers.addSelectionToAnswers(questionOneAnswerOne);
			PrepareQuizAnswers.addSelectionToAnswers(questionOneAnswerTwo);

			expect(PrepareQuizAnswers.getSelections()).toEqual({0: 1, 1: 2});
		});
	});

	describe('PrepareQuizAnswers Service: clearSelections', function() {
		it('should clear the selectedAnswers private property', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			expect(PrepareQuizAnswers.getSelections()).toEqual({0: 1});

			PrepareQuizAnswers.clearSelections();
			expect(PrepareQuizAnswers.getSelections()).toEqual({});
		});
	});

	describe('PrepareQuizAnswers Service: getSelectionsLength', function() {
		it('should return 0 if no objects are added', function() {
			expect(PrepareQuizAnswers.getSelectionsLength()).toEqual(0);
		});

		it('should return 1 if one object is added', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);

			expect(PrepareQuizAnswers.getSelectionsLength()).toEqual(1);
		});

		it('should return greater than 1 if more than one object is added', function() {
			PrepareQuizAnswers.addSelectionToAnswers(questionZeroAnswerOne);
			PrepareQuizAnswers.addSelectionToAnswers(questionOneAnswerOne);

			expect(PrepareQuizAnswers.getSelectionsLength()).toBeGreaterThan(1);
		});
	});
});
