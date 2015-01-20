var allQuestions = [{question: "Question 1: Grand Central Terminal, Park Avenue, New York is the world's",
                     choices: [{answer: "A: largest railway station"},
                               {answer: "B: highest railway station"},
                               {answer: "C: longest railway station"},
                               {answer: "D: None of the above"}],
                     correctAnswer: 0
                    },
                    {question: "Question 2: Entomology is the science that studies",
                     choices: [{answer: "A: Behavior of human beings"},
                               {answer: "B: Insects"},
                               {answer: "C: The origin and history of technical and scientific terms"},
                               {answer: "D: The formation of rocks"}],
                     correctAnswer: 1
                    },
                    {question: "Question 3: Friction can be reduced by changing from",
                     choices: [{answer: "A: sliding to rolling"},
                               {answer: "B: rolling to sliding"},
                               {answer: "C: potential energy to kinetic energy"},
                               {answer: "D: dynamic to static"}],
                     correctAnswer: 0
                    },
                    {question: "Question 4: For seeing objects at the surface of water from a submarine under water, the instrument used is",
                     choices: [{answer: "A: kaleidoscope"},
                               {answer: "B: spectroscope"},
                               {answer: "C: periscope"}, 
                               {answer: "D: telescope"}],
                     correctAnswer: 2
                    },
                    {question: "Question 5: Galileo was an Italian astronomer who",
                     choices: [{answer: "A: developed the telescope"},
                               {answer: "B: discovered four satellites of Jupiter"},
                               {answer: "C: discovered that the movement of pendulum produces a regular time measurement"},
                               {answer: "D: All of the above"}],
                     correctAnswer: 3
                    },
                    {question: "Question 6: Habeas Corpus Act 1679",
                     choices: [{answer: "A: states that no one was to be imprisoned without a writ or warrant stating the charge against him"},
                               {answer: "B: provided facilities to a prisoner to obtain either speedy trial or release in bail"},
                               {answer: "C: safeguarded the personal liberties of the people against arbitrary imprisonment by the king's orders"},
                               {answer: "D: All of the above"}],
                     correctAnswer: 3
                    },
                    {question: "Question 7: For galvanizing iron which of the following metals is used?",
                     choices: [{answer: "A: Aluminium"},
                               {answer: "B: Lead"},
                               {answer: "C: Zinc"},
                               {answer: "D: Copper"}],
                     correctAnswer: 2
                    }
                    ];


$(document).ready(function() {

    var questionNavIndex = 0,
        numberOfCorrectAnswers = 0,
        previousQuizAttempts = [],
        allQuestionsArrayLength = allQuestions.length;
    
    // ----Print Questions Function ----
    // Prints questions by adding tag IDs to the allQuestions array. Then uses Handlebars to
    // add the questions, choices, and IDs to the DOM
    
    var printQuizQuestions = function() {
        console.log(previousQuizAttempts == 0);
        if(previousQuizAttempts == 0) {
        for(var loopIndexQuestion = 0; loopIndexQuestion < allQuestionsArrayLength; loopIndexQuestion++) {
            var pathToQuestions = allQuestions[loopIndexQuestion];
                
            pathToQuestions.questionsDivElementID = "question-" + loopIndexQuestion;
            pathToQuestions.questionID = "q"+ loopIndexQuestion;

            for(var loopIndexChoices = 0, x = pathToQuestions.choices.length; loopIndexChoices < x; loopIndexChoices++) {
                var pathToChoices = pathToQuestions.choices[loopIndexChoices];
                
                pathToChoices.choiceID = "c" + loopIndexQuestion + "-" + loopIndexChoices;
                pathToChoices.radioButtonGroup = "quiz-radio-button-" + loopIndexQuestion;
                pathToChoices.radioID = "radio-" + pathToChoices.choiceID;
            }
        }}
        
        var theTemplateScript = $("#quiz-template").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        $(".quiz").append(theTemplate(allQuestions));
        
    };
    
    // ---- Tally Score ----
    // Creates the ID of the correct question for each radio-button-group, then finds out
    // if that radio button has been checked
    
    var tallyScore = function() {
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            var findAnswer = allQuestions[i].correctAnswer,
                answerID = "radio-c" + i + "-" + findAnswer;

            if(document.getElementById(answerID).checked) {numberOfCorrectAnswers++;}
        }

        $('#score-total').html(numberOfCorrectAnswers);
    };
    
    var updateProgressBar = function() {
        var value = 100 / (allQuestionsArrayLength / questionNavIndex)
        $('.progress-bar').css('width', value+'%').attr('aria-valuenow', value);
    };
    
    // ----Hide & Show elements----
    var changeDisplayOfElements = function(elem, state, classTrue) {
        var modifier;
        
        if (classTrue) {modifier = ".";}
        else {modifier = "#";}
        var element = modifier + elem;
        
        if(state === 'hide') {$(element).hide(); console.log('hide ' + element);}
        else if(state === 'show') {$(element).show(); console.log('show ' + element);}
        else {
            console.log("changeDisplayOfElements state or elem is incorrect");
            console.log(elem);
            console.log(state);
        }
    };
    
    // ----Nav Button Function----
    var navigateQuestions = function(direction) {
        var questionNavIDToHide = "question-" + questionNavIndex;
        changeDisplayOfElements(questionNavIDToHide, 'hide');

        if(direction === "next") {questionNavIndex++;}
        else if(direction === "back") {questionNavIndex--;}
        else {
            console.log("navigateQuestions() recieved unexpexted input - use next or back");
            console.log(direction);
        }

        var questionNavIDToShow = "question-" + questionNavIndex;
        changeDisplayOfElements(questionNavIDToShow, 'show');
    }

    // ----Begin button----
    $('#begin-button').click(function() {
        changeDisplayOfElements('welcome', 'hide');
        changeDisplayOfElements('nav-button', 'show', true);

        if(questionNavIndex === 0) {
            changeDisplayOfElements('back-button', 'hide');
        }

        printQuizQuestions();
        changeDisplayOfElements('question-0', 'show');
        changeDisplayOfElements('progress', 'show', true)
    });

    // ----Next button----
    $('#next-button').click(function() {
        navigateQuestions("next");
        updateProgressBar();
        
        if(questionNavIndex >= 0) {
            changeDisplayOfElements('back-button', 'show');
         }
        
        if(questionNavIndex === allQuestionsArrayLength) {
            changeDisplayOfElements('nav-button', 'hide', true);
            
            tallyScore();
            
            changeDisplayOfElements('score', 'show')
        }
    });

    // ----Back button----
    $('#back-button').click(function() {
        navigateQuestions("back");
        updateProgressBar();
        
        if(questionNavIndex === 0) {
            changeDisplayOfElements('back-button', 'hide');
        }
    });

    // ----Retake Quiz button----
    $('#retake-button').click(function() {
        $('.question-container').each(function () {
            $(this).remove();
        });
        questionNavIndex = 0
        previousQuizAttempts.push(numberOfCorrectAnswers);
        numberOfCorrectAnswers = 0;
        updateProgressBar();
        changeDisplayOfElements('score', 'hide');
        changeDisplayOfElements('progress', 'hide', true);
        changeDisplayOfElements('welcome', 'show');
    });
    
    // ----Show Answers button----
    $('#show-button').click(function() {
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            for(var j = 0; j < allQuestions[i].choices.length; j++) {
                var findAnswer = allQuestions[i].correctAnswer,
                answerID = "radio-c" + i + "-" + findAnswer,
                labelID = "#c" + i + "-" + j,
                radioID = "radio-c" + i + "-" + j,
                questionContainer = "question-" + i;
                
                if(document.getElementById(radioID).checked & !(answerID === radioID)) {
                    $(labelID).addClass('highlight-incorrect');
                    $(questionContainer).addClass('question-incorrect');
                }
                else if(answerID === radioID) {
                    $(labelID).addClass('highlight-correct');
                }
            }
        }
        
        for(i = 0; i < allQuestionsArrayLength; i++) {
            var element = 'question-' + i;
            changeDisplayOfElements(element, 'show');
            $('label').children().hide();
        }
    });
});


