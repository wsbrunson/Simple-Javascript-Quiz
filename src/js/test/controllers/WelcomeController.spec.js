describe('Welcome Controller Unit Tests', function() {

  beforeEach(module('myApp'));
  var WelcomeController,
      scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    WelcomeController = $controller('WelcomeController', {
      $scope: scope
    });
  }));

  it('says hello world!', function() {
    expect(scope.greeting).toEqual("Hello world!");
  });
});
