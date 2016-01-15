describe('ValidateAndScoreQuiz', function() {
	var ValidateAndScoreQuiz;
	var QuizService;

	var selectionsLengthOne = 1;
	var selectionsLengthCorrect = 7;

	var allCorrectQuizAttempt = {
		0: 1,
		1: 2,
		2: 1,
		3: 3,
		4: 1
	};

	var noCorrectQuizAttempt = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0
	};

	var threeCorrectQuizAttempt = {
		0: 0,
		1: 2,
		2: 1,
		3: 3,
		4: 0
	};

	beforeEach(function() {
		module('takeQuizServices');
	});

	beforeEach(inject(function(_ValidateAndScoreQuiz_, _QuizService_) {
		ValidateAndScoreQuiz = _ValidateAndScoreQuiz_;
		QuizService = _QuizService_;
	}));

	it('should initialize', function() {
		expect(ValidateAndScoreQuiz).toBeTruthy();
	});

	describe('ValidateAndScoreQuiz Service: validateQuiz', function() {

		beforeEach(function() {
			spyOn(QuizService, "getLengthOfQuiz").and.returnValue(7);
		});

		it('should return false with no input', function() {
			expect(ValidateAndScoreQuiz.validateQuiz()).toBeFalsy();
		});

		it('should return false with less selections than answers', function() {
			expect(ValidateAndScoreQuiz.validateQuiz(selectionsLengthOne)).toBeFalsy();
		});

		it('should return true if number of selections equal number of answers', function() {
			expect(ValidateAndScoreQuiz.validateQuiz(selectionsLengthCorrect)).toBeTruthy();
		});
	});

	describe('ValidateAndScoreQuiz Service: scoreQuiz', function() {
		beforeEach(function() {
			spyOn(QuizService, "getAnswers").and.returnValue([1, 2, 1, 3, 1]);
		});

		it('should return 5 if all selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(allCorrectQuizAttempt)).toBe(5);
		});

		it('should return 0 if none of the selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(noCorrectQuizAttempt)).toBe(0);
		});

		it('should return 3 if 3 selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(threeCorrectQuizAttempt)).toBe(3);
		});
	});
});
