QuizService.$inject = ['$http'];
function QuizService ($http) {
	'use strict';

	//https://api.myjson.com/bins/3dgdd - array
	//https://api.myjson.com/bins/2i86j - object

	const BASEURL = 'https://api.myjson.com/bins/';
	let quizData = [];

	return {
		getQuiz: getQuiz,
		getAnswers: getAnswers,
		getLengthOfQuiz: getLengthOfQuiz,
		getQuizData: getQuizData
	};

	function getAnswers() {
		return quizData.map(item => item.correctAnswer);
	}

	function getQuiz(quizId) {
		const url = BASEURL + quizId;

		return $http.get(url)
			.then(getQuizComplete)
			.catch(getQuizFailed);

			function getQuizComplete(response) {
				quizData = response.data;
				return response.data;
			}

			function getQuizFailed() {}
		}

		function getQuizData() {
			return quizData;
		}

		function getLengthOfQuiz() {
			return quizData.length;
		}
}

export default QuizService;
