/* global inject */
describe('createQuiz Component: ', function() {
    var elm;
    var scope;

    beforeEach(module('createQuiz'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.testModel = 42;
    }));

    function compileDirective(tpl) {
        if (!tpl) {
            tpl = '<create-quiz>';
        }
        
        inject(function($compile) {
            elm = $compile(tpl)(scope);
        });

        scope.$digest();
    }
    
    describe('initialization', function() {
        beforeEach(function() {
            compileDirective();
        });
        
        it('should compile properly', function() {
            expect(elm.isolateScope()).toBeTruthy();
        });
    });
});