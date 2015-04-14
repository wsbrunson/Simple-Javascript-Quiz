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
          controller: 'QuestionController'
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
