var allQuestions = [{question: "Question 1", 
                     choices: ["a", 
                               "b", 
                               "c", 
                               "d"],
                     correctAnwser: 2
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
    var questionsIndex = 0;
        
    
    var printQuizQuestions = function() {
        var pathToQuestion = allQuestions[questionsIndex].question,
            pathToChoices = allQuestions[questionsIndex].choices,
            questionTag = "<div class='question'>" + pathToQuestion + "</div>";
        
        $('#quiz').append(questionTag);
    
        for(var i = 0, x = pathToChoices.length; i < x; i++) {
            var choicesTag = "<label class='radio-label'>" +
                             "<input type='radio' name='quiz-radio-button' value='" + 
                             pathToChoices[i] + "'>" +  pathToChoices[i] + "</label>";
            $('#quiz').append(choicesTag);
        }
    };
    
    printQuizQuestions();

    //Next button
    $('#next-button').click(function() {
        $('.question').hide();
        $('.radio-label').hide();
        
        questionsIndex++;
        
        if(questionsIndex < allQuestions.length) {
            printQuizQuestions();
        }
        
        else {
            
            
            var talleyScore = function() {
                
            };
            
            $('#next-button').hide();
            $('#quiz').append("<p>You're total score is: </p>");
        }
    });
});