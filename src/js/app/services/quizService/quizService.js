function QuizService ($http) {
  //https://api.myjson.com/bins/3dgdd - array
  //https://api.myjson.com/bins/2i86j - object

  'use strict';

  const BASEURL    = 'https://api.myjson.com/bins/';

	return {
		getQuiz: getQuiz
	};

	function getQuiz(quizId) {
		const url = BASEURL + quizId;

		return $http.get(url)
			.then(getQuizComplete)
			.catch(getQuizFailed);

			function getQuizComplete(response) {
				return response.data;
			}

			function getQuizFailed() {}
		}
}

QuizService.$inject = ['$http'];
module.exports = QuizService;
