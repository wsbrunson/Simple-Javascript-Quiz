function homeView() {
	'use strict';

	var directiveConfig = {
		scope: {},
		templateUrl: 'src/js/app/views/home/homeTemplate.html',
		controller: homeViewController,
		controllerAs: 'vm',
		link: link
	};

	homeViewController.$inject = ['$location'];
	function homeViewController($location) {
		  var vm = this;

			vm.startQuiz = startQuiz;

			function startQuiz() {
		    $location.path('/quiz/5clco');
		  }
	}

	function link(scope) {
	}

	return directiveConfig;
}


module.exports = homeView;
