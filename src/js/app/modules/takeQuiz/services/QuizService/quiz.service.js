QuizService.$inject = ['$http'];
function QuizService ($http) {
	'use strict';

	//https://api.myjson.com/bins/3dgdd - array
	//https://api.myjson.com/bins/2i86j - object

	const BASEURL = 'https://api.myjson.com/bins/';

	let currentQuizId = null;
	let quizScore = 0;

	return {
		getQuiz: getQuiz,
		getQuizId: getQuizId,
		getQuizScore: getQuizScore,
		setQuizScore: setQuizScore
	};

	function getQuiz(quizId) {
		const url = BASEURL + quizId;

		currentQuizId = quizId;

		return $http.get(url)
			.then(getQuizComplete)
			.catch(getQuizFailed);

			function getQuizComplete(response) {
				return response.data;
			}

			function getQuizFailed(error) {
				console.error(`getQuiz failed: ${error}`);
			}
		}

	function getQuizId() {
		return currentQuizId;
	}

	function getQuizScore() {
		return quizScore;
	}

	function setQuizScore(newQuizScore) {
		quizScore = newQuizScore;
	}
}

export default QuizService;
