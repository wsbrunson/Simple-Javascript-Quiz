var app = angular
  .module('SimpleQuiz', ['ngRoute'])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/welcome.html',
          controller: 'WelcomeController'
        })
        .when('/questions', {
          templateUrl: 'views/questions.html',
          controller: 'QuestionController',
          controllerAs: 'question'
        })
        .when('/score', {
          templateUrl: 'views/score.html',
          controller: 'ScoreController'
        })
        .otherwise({
          redirectTo: '/'
        });
});

var allQuestions = [];

$(document).ready(function() {
    var questionNavIndex = 0,
        numberOfCorrectAnswers = 0,
        previousQuizAttempts = [],
        allQuestionsArrayLength = allQuestions.length;

    // ---- Tally Score ----
    // Creates the ID of the correct question for each radio-button-group, then finds out
    // if that radio button has been checked
    var tallyScore = function() {
        allQuestions.forEach(function(question) {
            if(document.getElementById(question.correctAnswer).checked) {numberOfCorrectAnswers++;}
        });

        $('#score-total').html(numberOfCorrectAnswers);
        console.log("talleyScore complete");
    };
    
    // ----Hide & Show elements----
    var hideElement = function(elem, classTrue) {
        var modifier = classTrue ? "." : "#",
            element = modifier + elem;
        
        $(element).hide();
        
    };
    
    var showElement = function(elem, classTrue) {
        var modifier = classTrue ? "." : "#",
            element = modifier + elem;
        
        $(element).show();
    };
    
    // ----Nav Button Function----
    var navigateQuestions = function(direction) {
        var questionNavIDToHide = "question-" + questionNavIndex;
        hideElement(questionNavIDToHide);

        if(direction === "next") { questionNavIndex++; }
        else if(direction === "back") { questionNavIndex--; }
        else {
            console.log("navigateQuestions() recieved unexpexted input - use next or back");
            console.log(direction);
        }

        var questionNavIDToShow = "question-" + questionNavIndex;
        showElement(questionNavIDToShow);
    };

    /*// ----Begin button----
    $('#begin-button').click(function() {
        pushIDsToAllQuestionsArray();
        console.log("after ng", allQuestions);
        
        hideElement('welcome', true);
        showElement('nav-button', true);

        showElement('question-0');
        showElement('progress', true);

    });*/

    /*// ----Next button----
    $('#next-button').click(function() {
        console.log(questionNavIndex);
        navigateQuestions("next");
        
        if(questionNavIndex >= 0) {
            showElement('back-button');
         }
        
        if(questionNavIndex === allQuestionsArrayLength) {
            console.log('end quiz');
            hideElement('nav-button', true);
            
            tallyScore();
            
            showElement('score', true);
        }
    });*/

    // ----Back button----
    $('#back-button').click(function() {
        navigateQuestions("back");
        
        if(questionNavIndex === 0) {
            hideElement('back-button');
        }
    });

    // ----Retake Quiz button----
    $('#retake-button').click(function() {
        $('.question-container').each(function () {
            $(this).remove();
        });
        questionNavIndex = 0;
        previousQuizAttempts.push(numberOfCorrectAnswers);
        numberOfCorrectAnswers = 0;
        hideElement('score', true);
        hideElement('progress', true);
        showElement('welcome', true);
        printQuizQuestions();
    });
    
    // ----Show Answers button----
    $('#show-button').click(function() {
        allQuestions.forEach(function(question) {
            question.choices.forEach(function(choice) {
                var hastageChoiceID = "#" + choice.choiceID,
                    radioIDChecked = document.getElementById(choice.radioID).checked;
                
                if (radioIDChecked && question.correctAnswer !== choice.radioID) {
                    $(hastageChoiceID).addClass('highlight-incorrect');
               }
               
                else if(question.correctAnswer === choice.radioID) {
                    $(hastageChoiceID).addClass('highlight-correct');
                }
            });
        });

        allQuestions.forEach(function(question, questionIndex) {
            var element = 'question-' + questionIndex;
            showElement(element);
            $('label').children().hide();
        });
        
        hideElement('progress', true);
    });
});

app.controller('QuestionController', ['$http', '$scope', '$location', function($http, $scope, $location){
  
  var question = this;
  question.allQuestions = [];
  question.questionNavIndex = 0;

  $scope.answersArray = [];
  
  var radioButtonGroupName = 'input[name=group-' + question.questionNavIndex + ']';
  var radioButtonGroup = $(radioButtonGroupName);

  $http.get('https://api.myjson.com/bins/2i86j').success(function(data) {
    data.questions.forEach(function(element){
      question.allQuestions.push(element);
      console.log('Done');
    });

    question.allQuestionsLength = question.allQuestions.length;
  });
  
  function _setPreviousAnswer() {
    if(question.allQuestions[question.questionNavIndex].selectedAnswer) {
      console.log("true");
      var choiceTag = '#' + question.allQuestions[question.questionNavIndex].selectedAnswer;
      console.log(choiceTag);
      console.log($(choiceTag));
      $(choiceTag).prop('checked', 'checked');
    }
  }
        
  question.nextButton = function() {
    if(question.questionNavIndex === question.allQuestionsLength) {
      $location.path('/score');
    }
    
    else {
      if (question.allQuestions[question.questionNavIndex].selectedAnswer || 
          question.allQuestions[question.questionNavIndex].selectedAnswer === 0) {
        question.questionNavIndex++;
      } 
      
      else {
        alert("Please select an answer");
      }
      
    }
  };
        
  question.backButton = function() {
    question.questionNavIndex--;
     _setPreviousAnswer();
  };
  
  //Using this instead of $scope returns the controller instead of the element. I hope I can find a way to stop using $scope,
  //but for now, this works. Sorry future me!
  $scope.isSelected = function() {
    question.allQuestions[question.questionNavIndex].selectedAnswer = this.$index;
    
    if (question.questionNavIndex > -1) {
      $scope.answersArray.splice(question.questionNavIndex, 1);
      $scope.answersArray.push(question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    else {
    $scope.answersArray.push(question.allQuestions[question.questionNavIndex].selectedAnswer);
    }
    console.log($scope.answersArray);
  };
}]);

app.controller('ScoreController', ['$scope', '$location', function($scope, $location) {
  
  $scope.totalScore = 0;
  
  (function _calculateScore() {
    for(var i; i < $scope.allQuestionsLength; i++) {
      console.log($scope.allQuestions[i].selectedAnswer);
      console.log($scope.allQuestions[i].correctAnswer);
      if($scope.allQuestions[i].selectedAnswer === $scope.allQuestions[i].correctAnswer) {
        $scope.totalScore++;
      }
    }
  })();
}]);
app.controller('WelcomeController', function($scope, $location) {
  
  $scope.startQuiz = function() {
    return $location.path('/questions');
  };
});