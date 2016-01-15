routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('createQuiz', {
      url: '/',
      template: '<create-quiz></create-quiz>'
    });
}
