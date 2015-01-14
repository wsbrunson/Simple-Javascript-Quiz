var allQuestions = [{question: "Question 1: Grand Central Terminal, Park Avenue, New York is the world's",
                     choices: ["A: largest railway station",
                               "B: highest railway station",
                               "C: longest railway station",
                               "D: None of the above"],
                     correctAnswer: 0
                    },
                    {question: "Question 2: Entomology is the science that studies",
                     choices: ["A: Behavior of human beings",
                               "B: Insects",
                               "C: The origin and history of technical and scientific terms",
                               "D: The formation of rocks"],
                     correctAnswer: 1
                    },
                    {question: "Question 3: Friction can be reduced by changing from",
                     choices: ["A: sliding to rolling",
                               "B: rolling to sliding",
                               "C: potential energy to kinetic energy",
                               "D: dynamic to static"],
                     correctAnswer: 0
                    },
                    {question: "Question 4: For seeing objects at the surface of water from a submarine under water, the instrument used is",
                     choices: ["A: kaleidoscope",
                               "B: spectroscope",
                               "C: periscope",
                               "D: telescope"],
                     correctAnswer: 2
                    },
                    {question: "Question 5: Galileo was an Italian astronomer who",
                     choices: ["A: developed the telescope",
                               "B: discovered four satellites of Jupiter",
                               "C: discovered that the movement of pendulum produces a regular time measurement",
                               "D: All of the above"],
                     correctAnswer: 3
                    },
                    {question: "Question 6: Habeas Corpus Act 1679",
                     choices: ["A: states that no one was to be imprisoned without a writ or warrant stating the charge against him",
                               "B: provided facilities to a prisoner to obtain either speedy trial or release in bail",
                               "C: safeguarded the personal liberties of the people against arbitrary imprisonment by the king's orders",
                               "D: All of the above"],
                     correctAnswer: 3
                    },
                    {question: "Question 7: For galvanizing iron which of the following metals is used?",
                     choices: ["A: Aluminium",
                               "B: Lead",
                               "C: Zinc",
                               "D: Copper"],
                     correctAnswer: 2
                    }
                    ];


$(document).ready(function() {

    var questionNavIndex = 0,
        numberOfCorrectAnswers = 0,
        previousQuizAttempts = [],
        allQuestionsArrayLength = allQuestions.length;

    var printQuizQuestions = function() {
        for(var loopIndexQuestion = 0; loopIndexQuestion < allQuestionsArrayLength; loopIndexQuestion++) {
            var pathToQuestion = allQuestions[loopIndexQuestion].question,
                pathToChoices = allQuestions[loopIndexQuestion].choices,
                
                questionsDivElementID = "question-" + loopIndexQuestion,
                questionsDivElement = "<div class='question-container' id='" + questionsDivElementID + "'></div>",
                hastagDivElement = "#" + questionsDivElementID,
                
                questionID = "q"+ loopIndexQuestion,
                questionTag = "<p class='question' id='" + questionID + "'>" + pathToQuestion + "</div>";

            $('#quiz').append(questionsDivElement);
            $(hastagDivElement).append(questionTag);

            for(var loopIndexChoices = 0, x = pathToChoices.length; loopIndexChoices < x; loopIndexChoices++) {
                var choicesID = "c" + loopIndexQuestion + "-" + loopIndexChoices,
                    choicesTag = "<label class='radio-label' id='" + choicesID + "'>" +
                                 "<input type='radio' name='quiz-radio-button-" + loopIndexQuestion + "' id='radio-" + choicesID +
                                 "'>   " +  pathToChoices[loopIndexChoices] + "</label>";

                $(hastagDivElement).append(choicesTag);
            }

            $(hastagDivElement).hide();
        }
    };

    var tallyScore = function() {
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            var findAnswer = allQuestions[i].correctAnswer,
                answerID = "radio-c" + i + "-" + findAnswer;

            //console.log(answerID);
            //console.log(document.getElementById(answerID));
            //console.log(document.getElementById(answerID).checked);
            if(document.getElementById(answerID).checked) {
                //console.log('true');
                numberOfCorrectAnswers++;
                //console.log(numberOfCorrectAnswers);
            }
        }

        $('#score-total').html(numberOfCorrectAnswers);
    };
    
    // ----Hide & Show button----
    var changeDisplayOfElements = function(elem, state) {
        var element = "#" + elem;
        
        if(state === 'hide') {$(element).hide('slow');}
        else if(state === 'show') {$(element).show('slow');}
        else {
            console.log("changeDisplayOfElements state or elem is incorrect");
            console.log(elem);
            console.log(state);
        }
    };
    
    // ----Nav Button Function----
    var navigateQuestions = function(direction) {
        var questionNavIDToHide = "question-" + questionNavIndex;
        //$(questionNavIDToHide).hide('fast');
        changeDisplayOfElements(questionNavIDToHide, 'hide');

        if(direction==="next") {questionNavIndex++;}
        else if(direction==="back") {questionNavIndex--;}
        else {
            console.log("navigateQuestions() recieved unexpexted input - use next or back");
            console.log(direction);
        }

        var questionNavIDToShow = "question-" + questionNavIndex;
        //$(questionNavIDToShow).show('fast');
        changeDisplayOfElements(questionNavIDToShow, 'show');
    }

    // ----Begin button----
    $('#begin-button').click(function() {
        //$('#welcome').hide('fast');
        changeDisplayOfElements('welcome', 'hide');
        //$('#nav-button').show('fast');
        changeDisplayOfElements('nav-button', 'show');

        if(questionNavIndex === 0) {
            //$('#back-button').hide('fast');
            changeDisplayOfElements('back-button', 'hide');
        }

        printQuizQuestions();
        //$('#question-0').show('fast');
        changeDisplayOfElements('question-0', 'show');
        changeDisplayOfElements('show-button', 'show');
    });

    // ----Next button----
    $('#next-button').click(function() {
        navigateQuestions("next");
        
        if(questionNavIndex >= allQuestionsArrayLength) {
            //$('#nav-button').hide('fast');
            changeDisplayOfElements('nav-button', 'hide');
            tallyScore();
            //$('#score').show('fast');
            changeDisplayOfElements('score', 'show')
        }

         if(questionNavIndex >= 0) {
            //$('#back-button').show('fast');
            changeDisplayOfElements('back-button', 'show');
         }
    });

    // ----Back button----
    $('#back-button').click(function() {
        navigateQuestions("back");
        
        if(questionNavIndex === 0) {
            $(this).hide();
        }
    });

    // ----Retake Quiz button----
    $('#retake-button').click(function() {
        $('#quiz').children().remove();
        questionNavIndex = 0
        previousQuizAttempts.push(numberOfCorrectAnswers);
        numberOfCorrectAnswers = 0;
        //$('#score').hide('fast');
        changeDisplayOfElements('score', 'hide');
        //$('#welcome').show('fast');
        changeDisplayOfElements('welcome', 'show');

        console.log(previousQuizAttempts);
    });
    
    // ----Show Answers button----
    $('#show-button').click(function() {

            /*console.log(answerID);
            console.log(labelID)
            console.log(document.getElementById(answerID));
            console.log(document.getElementById(answerID).checked);
            console.log('true');
            $(labelID).addClass('highlight-correct');
            */
        
        
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            for(var j = 0; j < allQuestions[i].choices.length; j++) {
                var findAnswer = allQuestions[i].correctAnswer,
                answerID = "radio-c" + i + "-" + findAnswer,
                //hastagAnswerID = "#" + answerID,
                labelID = "#c" + i + "-" + j,
                radioID = "radio-c" + i + "-" + j;
                console.log("answerID " + answerID);
                console.log("labeID " + labelID);
                console.log("radioID " + radioID);
                //console.log("hastagAnswerID " + hastagAnswerID);
                console.log(document.getElementById(radioID).checked);
                console.log(!(answerID === radioID));
                
                if(document.getElementById(radioID).checked & !(answerID === radioID)) {
                    console.log("painted incorrect");
                    $(labelID).addClass('highlight-incorrect');
                    
                }
                else if(answerID === radioID) {
                    $(labelID).addClass('highlight-correct');
                    
                }
            }
        }
        
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            var element = 'question-' + i;
            //$('.question').show('fast');
            changeDisplayOfElements(element, 'show');
            $('label').children().hide();
        }
        
    });
});
