(() => {
	'use strict';
	
	angular.module('SimpleQuiz')
		.directive('home', homeView);

		function homeView() {


			var directiveConfig = {
				scope: {},
				templateUrl: 'src/js/app/views/home/homeTemplate.html',
				controller: homeViewController,
				controllerAs: 'vm'
			};

			homeViewController.$inject = ['$location'];
			function homeViewController($location) {
				const vm = this;

					vm.startQuiz = startQuiz;

					function startQuiz() {
						$location.path('/quiz/5clco');
					}
			}

			return directiveConfig;
		}
})();
