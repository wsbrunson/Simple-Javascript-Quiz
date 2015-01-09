var allQuestions = [{question: "Question 1", choices: ["a", "b", "c", "d"]}, 
                    {question: "Question 2", choices: ["a", "b", "c", "d"]}, 
                    {question: "Question 3", choices: ["a", "b", "c", "d"]}
                    ];

$(document).ready(function() {
    
    //Load first quiz question
    var questionsIndex = 0,
        pathToQuestion = allQuestions[questionsIndex].question,
        pathToChoices = allQuestions[questionsIndex].choices,
        questionTag = "<div class='question'>" + pathToQuestion + "</div>";
    
    $('#quiz').append(questionTag);
    
    for(var i = 0, x = pathToChoices.length; i < x; i++) {
        var choicesTag = "<input type='radio' name='quiz-radio-button' value='" + pathToChoices[i] + "'>";
        $('#quiz').append(choicesTag);
        $('#quiz').append("<label class='radio-label'>" + pathToChoices[i] + "</label>");
    }
});