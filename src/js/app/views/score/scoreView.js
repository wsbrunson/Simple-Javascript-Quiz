(() => {
	'use strict';

	angular.module('SimpleQuiz')
		.directive('score', scoreView);

		function scoreView() {


			var directiveConfig = {
				scope: {},
				templateUrl: 'src/js/app/views/score/scoreTemplate.html',
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
})();
