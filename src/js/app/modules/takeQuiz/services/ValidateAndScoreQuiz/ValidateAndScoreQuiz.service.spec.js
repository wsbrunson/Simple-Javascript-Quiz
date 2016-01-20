describe('ValidateAndScoreQuiz', function() {
	var ValidateAndScoreQuiz;

	const allCorrectQuizAttempt = {
		0: 1,
		1: 2,
		2: 1,
		3: 3,
		4: 1
	};

	const noCorrectQuizAttempt = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0
	};

	const threeCorrectQuizAttempt = {
		0: 0,
		1: 2,
		2: 1,
		3: 3,
		4: 0
	};

	beforeEach(function() {
		module('takeQuizServices');
	});

	beforeEach(inject(function(_ValidateAndScoreQuiz_) {
		ValidateAndScoreQuiz = _ValidateAndScoreQuiz_;
	}));

	it('should initialize', function() {
		expect(ValidateAndScoreQuiz).toBeTruthy();
	});

	describe('ValidateAndScoreQuiz Service: validateQuiz', function() {
		const quizLength = 7;
		const incorrectQuizLength = 3;

		it('should return false with no input', function() {
			expect(ValidateAndScoreQuiz.validateQuiz()).toBeFalsy();
		});

		it('should return false with less selections than answers', function() {
			expect(ValidateAndScoreQuiz.validateQuiz(incorrectQuizLength, quizLength)).toBeFalsy();
		});

		it('should return true if number of selections equal number of answers', function() {
			expect(ValidateAndScoreQuiz.validateQuiz(quizLength, quizLength)).toBeTruthy();
		});
	});

	describe('ValidateAndScoreQuiz Service: scoreQuiz', function() {
		const correctAnswers = [1, 2, 1, 3, 1];

		it('should return 5 if all selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(allCorrectQuizAttempt, correctAnswers)).toBe(5);
		});

		it('should return 0 if none of the selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(noCorrectQuizAttempt, correctAnswers)).toBe(0);
		});

		it('should return 3 if 3 selections are correct', function() {
			expect(ValidateAndScoreQuiz.scoreQuiz(threeCorrectQuizAttempt, correctAnswers)).toBe(3);
		});
	});
});
