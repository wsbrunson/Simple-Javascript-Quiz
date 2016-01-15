ValidateAndScoreQuiz.$inject = ['QuizService'];
function ValidateAndScoreQuiz (QuizService) {
	'use strict';

	return {
		scoreQuiz: scoreQuiz,
		validateQuiz: validateQuiz
	};

	function _getAnswersFromObject(obj) {
		var key;
		let array = [];

		for(key in obj) {
			array.push(obj[key]);
		}

		return array;
	}

	function scoreQuiz(quizAttempt) {
		const answers = _getAnswersFromObject(quizAttempt);
		const correctAnswers = QuizService.getAnswers();
		let score = 0;
		
		for(let i = 0; i < answers.length; i++) {
			if(answers[i] === correctAnswers[i]) score++;
		}

		return score;
	}

	function validateQuiz(attemptToValidate) {
		const quizSize = QuizService.getLengthOfQuiz();

		if(!attemptToValidate) {
			return false;
		} else if (quizSize === attemptToValidate) {
			return true;
		} else {
			return false;
		}
	}
}

export default ValidateAndScoreQuiz;
