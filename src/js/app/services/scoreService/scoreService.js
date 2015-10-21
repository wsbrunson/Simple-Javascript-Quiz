(() => {
	'use strict';
	angular.module('SimpleQuiz')
		.service('ScoreService', ScoreService);

		function ScoreService() {
			return {
				test: true
			};
		}
})();
