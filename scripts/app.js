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
    
    //Load first quiz question
    var questionsIndex = 0,
        numberOfCorrectAnswers = 0;
        
    
    var printQuizQuestions = function() {
        var pathToQuestion = allQuestions[questionsIndex].question,
            pathToChoices = allQuestions[questionsIndex].choices,
            questionTag = "<div class='question'>" + pathToQuestion + "</div>";
        
        $('#quiz').append(questionTag);
    
        for(var i = 0, x = pathToChoices.length; i < x; i++) {
            var choicesTag = "<label class='radio-label'>" +
                             "<input type='radio' name='quiz-radio-button-" + questionsIndex + 
                             "' id='" + questionsIndex + "-" + i + "'>" +  pathToChoices[i] + "</label>";
            
            $('#quiz').append(choicesTag);
        }
    };
    
    printQuizQuestions();

    //Next button
    $('#next-button').click(function() {
        $('.question').hide();
        $('.radio-label').hide();
        
        var talleyScore = function() {
                var findAnswer = allQuestions[questionsIndex].correctAnswer,
                    answerID = questionsIndex + "-" + findAnswer;
                
                if(document.getElementById(answerID).checked) {numberOfCorrectAnswers++;}
            };
            
        talleyScore();
        
        questionsIndex++;
        
        if(questionsIndex < allQuestions.length) {
            printQuizQuestions();
        }
        
        else {
            $('#next-button').hide();
            $('#quiz').append("<p>Your total score is: " + numberOfCorrectAnswers + "</p>");
        }
    });
});