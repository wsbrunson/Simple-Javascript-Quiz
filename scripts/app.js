
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
                    findAnswer = allQuestions[loopIndexQuestion].correctAnswer,                                             //This checks the correct answer
                    answerID = "c" + loopIndexQuestion + "-" + findAnswer,                                                  //This checks the correct answer
                    choicesTag = "<label class='radio-label' id='" + choicesID + "'>" +
                                 "<input type='radio' name='quiz-radio-button-" + loopIndexQuestion + 
                                 "'>   " +  pathToChoices[loopIndexChoices] + "</label>",
                    correctChoicesTag = "<label class='radio-label' id='" + choicesID + "'>" +                              //This checks the correct answer
                                 "<input type='radio' checked='checked' name='quiz-radio-button-" + loopIndexQuestion + 
                                 "'>   " +  pathToChoices[loopIndexChoices] + "</label>";
                
                if(choicesID === answerID) {$(hastagDivElement).append(correctChoicesTag);}                                 //This checks the correct answer
                else {$(hastagDivElement).append(choicesTag);}
            }
            
            if(loopIndexQuestion !==0) {$(hastagDivElement).hide();}
        }
    };
    
    var tallyScore = function() {
        for(var i = 0; i < allQuestionsArrayLength; i++) {
            var findAnswer = allQuestions[i].correctAnswer,
                answerID = "#c" + i + "-" + findAnswer;
            
            console.log(answerID);
            console.log(answerID.getAttribute('checked'));
            // Doesn't work right now: document.getElementById(answerID).checked
            if(answerID.getAttribute('checked')) {
                console.log('true');
                numberOfCorrectAnswers++;
                console.log(numberOfCorrectAnswers);
            };
        }
    };

    printQuizQuestions();
    tallyScore();
    
    //Begin button
    $('#begin-button').click(function() {
        $('#welcome').hide();
        $('.nav-button').show();
        
        if(questionNavIndex === 0) {
            $('#back-button').hide();
        }
        
        printQuizQuestions();
        tallyScore();
    });
    
    //Next button
    $('#next-button').click(function() {
        var questionNavIDToHide = "#question-" + questionNavIndex;
        
        $(questionNavIDToHide).hide();
        
        questionNavIndex++
        
        var questionNavIDToShow = "#question-" + questionNavIndex;
        
        $(questionNavIDToShow).show();

        if(questionNavIndex >= allQuestionsArrayLength) {
            $('.nav-button').hide();
            $('#score').show();
            tallyScore();
            $('#score').append("<p id='total'>Your total score is: " + numberOfCorrectAnswers + "</p>");
        }
        
         if(questionNavIndex >= 0) {
            $('#back-button').show();
         }
    });
    
    //Back button
    $('#back-button').click(function() {
        if(questionNavIndex === 0) {
            $('#back-button').hide();
        }
        
        var questionNavIDToHide = "#question-" + questionNavIndex;
        
        $(questionNavIDToHide).hide();
        
        questionNavIndex--
        
        var questionNavIDToShow = "#question-" + questionNavIndex;
        
        $(questionNavIDToShow).show();
        
        if(questionNavIndex <= allQuestionsArrayLength) {
            $('#next-button').show();
            $('#total').hide();
        }
    });
});