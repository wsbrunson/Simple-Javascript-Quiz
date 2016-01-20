/* global inject */
describe('Quiz Model: ', function() {
	var QuizModel;

	const questionOne = {
        'question': 'Grand Central Terminal, Park Avenue, New York is the world\'s',
        'choices': [{'answer': 'largest railway station'}, 
                    {'answer': 'highest railway station'}, 
                    {'answer': 'longest railway station'}, 
                    {'answer': 'None of the above'}],
        'correctAnswer': 0
    }; 
    
    const questionTwo = {
        'question': 'Entomology is the science that studies',
        'choices': [{'answer': 'Behavior of human beings'}, 
                    {'answer': 'Insects'}, 
                    {'answer': 'The origin and history of technical and scientific terms'}, 
                    {'answer': 'The formation of rocks'}, 
                    {'answer': 'None of the above'}],
        'correctAnswer': 1
    };
    
    const questionThree = {
        'question': 'Friction can be reduced by changing from',
        'choices': [{'answer': 'sliding to rolling'}, 
                    {'answer': 'rolling to sliding'}, 
                    {'answer': 'potential energy to kinetic energy'}, 
                    {'answer': 'dynamic to static'}],
        'correctAnswer': 0
    };
    
    const oneQuestionQuiz = [questionOne];
    const twoQuestionQuiz = [questionOne, questionTwo];
    const manyQuestionQuiz = [questionOne, questionTwo, questionThree];
    
    beforeEach(module('SimpleQuiz'));

	beforeEach(inject(function(_QuizModel_) {
		QuizModel = _QuizModel_;
	}));

	it('should initialize', function() {
		expect(QuizModel).toBeTruthy();
	});
    
    it('should have the correct properties for a one question Quiz', function() {
        var quiz = new QuizModel(oneQuestionQuiz);

        expect(quiz.length).toBe(1);
        expect(quiz.quizData).toEqual(oneQuestionQuiz);
        expect(quiz.correctAnswers).toEqual([0]);
    });
    
    it('should have the correct properties for a two question Quiz', function() {
        var quiz = new QuizModel(twoQuestionQuiz);

        expect(quiz.length).toBe(2);
        expect(quiz.quizData).toEqual(twoQuestionQuiz);
        expect(quiz.correctAnswers).toEqual([0, 1]);
    });

	it('should have the correct properties for a many question Quiz', function() {
		var quiz = new QuizModel(manyQuestionQuiz);

		expect(quiz.length).toBe(3);
		expect(quiz.quizData).toEqual(manyQuestionQuiz);
		expect(quiz.correctAnswers).toEqual([0, 1, 0]);
	});
});