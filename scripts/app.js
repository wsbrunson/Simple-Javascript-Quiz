var allQuestions = [{question: "Question 1", 
                     choices: ["a", 
                               "b", 
                               "c", 
                               "d"],
                     correctAnswer: 2
                    }, 
                    {question: "Question 2", 
                     choices: ["1", 
                               "2", 
                               "3", 
                               "4"],
                     correctAnswer: 0
                    }, 
                    {question: "Question 3", 
                     choices: ["z", 
                               "y", 
                               "x", 
                               "w"],
                     correctAnswer: 1
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