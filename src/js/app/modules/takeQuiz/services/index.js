import angular from 'angular';

import PrepareQuizAnswers from './PrepareQuizAnswers/PrepareQuizAnswers.service.js';
import ValidateAndScoreQuiz from './ValidateAndScoreQuiz/ValidateAndScoreQuiz.service.js';
import QuizService from './QuizService/quiz.service';

export default angular.module('takeQuizServices', [])
  .service('PrepareQuizAnswers', PrepareQuizAnswers)
	.service('ValidateAndScoreQuiz', ValidateAndScoreQuiz)
	.service('QuizService', QuizService)
  .name;
