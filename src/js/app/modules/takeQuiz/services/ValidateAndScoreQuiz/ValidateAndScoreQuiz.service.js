function ValidateAndScoreQuiz () {
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

	function scoreQuiz(quizAttempt, correctAnswers) {
		const answers = _getAnswersFromObject(quizAttempt);
		let score = 0;
		
		for(let i = 0; i < answers.length; i++) {
			if(answers[i] === correctAnswers[i]) score++;
		}

		return score;
	}

	function validateQuiz(attemptToValidate, actualQuizLength) {
		return attemptToValidate && actualQuizLength === attemptToValidate;
	}
}

export default ValidateAndScoreQuiz;
