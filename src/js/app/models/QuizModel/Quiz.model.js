function QuizModelWrapper () {
	'use strict';
    
    var QuizModel = function(quizData) {
        this.quizData = quizData;
        this.length = quizData.length;
        this.correctAnswers = quizData.map(question => question.correctAnswer);
    };
    
    return QuizModel;
}

export default QuizModelWrapper;
