var allQuestions = [{question: "Question 1", choices: ["a", "b", "c", "d"]}, 
                    {question: "Question 2", choices: ["a", "b", "c", "d"]}, 
                    {question: "Question 3", choices: ["a", "b", "c", "d"]}
                    ];

$(document).ready(function() {
    
    //Load first quiz question
    var questionsIndex = 0,
        pathToQuestion = allQuestions[questionsIndex].question,
        pathToChoices = allQuestions[questionsIndex].choices;
    
    $('#quiz').append(pathToQuestion)
    
    for(var i = 0, x = pathToChoices.length; i < x; i++) {
        $('#quiz').append(pathToChoices[i]);
    }
});