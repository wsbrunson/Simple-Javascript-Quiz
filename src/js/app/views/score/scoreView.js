function scoreView() {
	'use strict';

	var directiveConfig = {
		scope: {},
		templateUrl: 'src/js/app/views/score/scoreTemplate.html',
		controller: scoreViewController,
		controllerAs: 'vm',
		link: link
	};

	scoreViewController.$inject = ['$scope', '$location', 'ScoreService'];
	function scoreViewController($scope, $location, ScoreService) {
		  var vm = this;

			vm.score = ScoreService.getScore();
			vm.retakeQuiz = retakeQuiz;

			function retakeQuiz() {
			    ScoreService.resetScore();
			    $location.path('/');
			  }
	}

	function link(scope, elem, attrs, ctrl) {}

	return directiveConfig;
}


module.exports = scoreView;
