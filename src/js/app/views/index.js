var app = require('angular').module('SimpleQuiz');

app.directive('home', require('./home/homeView.js'));
app.directive('quiz', require('./quiz/quizView.js'));
app.directive('score', require('./score/scoreView.js'));
