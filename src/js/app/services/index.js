var app = require('angular').module('SimpleQuiz');

app.service('QuizService', require('./quizService/quizService.js'));
app.service('ScoreService', require('./scoreService/scoreService.js'));
