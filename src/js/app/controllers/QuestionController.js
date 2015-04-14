app.controller('QuestionController', ['$http', function($http, $scope){
        var quiz = this;
        this.allQuestions = [];
        this.questionNavIndex = 0;
        
        $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
            data.questions.forEach(function(element){
                quiz.allQuestions.push(element);
            });

            allQuestions = quiz.allQuestions;
            quiz.allQuestionsLength = quiz.allQuestions.length;
            console.log('ajax complete');
        });
        
        this.nextButton = function() {
            this.questionNavIndex++;
            console.log(this.questionNavIndex);
        };
        
        this.backButton = function() {
            this.questionNavIndex--;
            console.log(this.questionNavIndex);
        };
}]);
