function score() {
	'use strict';

	var directiveConfig = {
		scope: {},
		templateUrl: 'src/js/app/modules/takeQuiz/components/score/score.html',
		controller: scoreViewController,
		controllerAs: 'vm'
	};

	scoreViewController.$inject = ['$scope', '$location', 'ScoreService'];
	function scoreViewController($scope, $location, ScoreService) {
			const vm = this;

			vm.score = ScoreService.getScore();
			vm.retakeQuiz = retakeQuiz;

			function retakeQuiz() {
				ScoreService.resetScore();
				$location.path('/');
			}
	}

	return directiveConfig;
}

export default score;
