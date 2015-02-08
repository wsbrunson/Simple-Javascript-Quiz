var allQuestions = {};
    
$.ajax({
    url: "https://api.myjson.com/bins/2i86j",
    async: false,
    dataType: 'json',
	success: function(data) {
		allQuestions = data.questions;
	}
});

var pushIDsToAllQuestionsArray = function() {
    allQuestions.forEach(function(question, questionIndex) {
        question.questionsDivElementID = "question-" + questionIndex;
        question.questionID = "q"+ questionIndex;
                
        question.choices.forEach(function(choice, choiceIndex) {
            choice.choiceID = "c" + questionIndex + "-" + choiceIndex;
            choice.radioButtonGroup = "quiz-radio-button-" + questionIndex;
            choice.radioID = "radio-" + choice.choiceID;
        });
    });
};

var createHandlebarsTemplate = function() {
    var theTemplateScript = $("#quiz-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".quiz").append(theTemplate(allQuestions));
};

var printQuizQuestions = function() {
    pushIDsToAllQuestionsArray();
    createHandlebarsTemplate();
};

$(document).ready(function() {
    var questionNavIndex = 0,
        numberOfCorrectAnswers = 0,
        correctAnswerIDArray = [],
        previousQuizAttempts = [],
        allQuestionsArrayLength = allQuestions.length;

    // ---- Tally Score ----
    // Creates the ID of the correct question for each radio-button-group, then finds out
    // if that radio button has been checked
    var tallyScore = function() {
        allQuestions.forEach(function(question, questionIndex) {
            correctAnswerIDArray.push("radio-c" + questionIndex  + "-" + question.correctAnswer);

            if(document.getElementById(correctAnswerIDArray[questionIndex]).checked) {numberOfCorrectAnswers++;}
        });

        $('#score-total').html(numberOfCorrectAnswers);
    };
    
    var updateProgressBar = function() {
        var value = 100 / (allQuestionsArrayLength / questionNavIndex);
        $('.progress-bar').css('width', value+'%').attr('aria-valuenow', value);
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

    // ----Begin button----
    $('#begin-button').click(function() {
        hideElement('welcome');
        showElement('nav-button', true);
        printQuizQuestions();
        if(questionNavIndex === 0) {
            hideElement('back-button');
        }

        showElement('question-0');
        showElement('progress', true);
    });

    // ----Next button----
    $('#next-button').click(function() {
        navigateQuestions("next");
        updateProgressBar();
        
        if(questionNavIndex >= 0) {
            showElement('back-button');
         }
        
        if(questionNavIndex === allQuestionsArrayLength) {
            hideElement('nav-button', true);
            
            tallyScore();
            
            showElement('score');
        }
    });

    // ----Back button----
    $('#back-button').click(function() {
        navigateQuestions("back");
        updateProgressBar();
        
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
        updateProgressBar();
        hideElement('score');
        hideElement('progress', true);
        showElement('welcome');
        printQuizQuestions();
    });
    
    // ----Show Answers button----
    $('#show-button').click(function() {
        allQuestions.forEach(function(question, questionIndex) {
            question.choices.forEach(function(choice, choiceIndex) {
               var hastageChoiceID = "#" + choice.choiceID;
                
                if(document.getElementById(choice.radioID).checked && correctAnswerIDArray[questionIndex] !== choice.radioID) {
                    $(hastageChoiceID).addClass('highlight-incorrect');
                    $(question.questionsDivElementID).addClass('question-incorrect');
               }
               
                else if(correctAnswerIDArray[questionIndex] === choice.radioID) {
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