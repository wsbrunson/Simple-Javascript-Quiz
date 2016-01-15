import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './takeQuiz.routes';
import takeQuizComponent from './takeQuiz.component';
import questions from './components/questions/questions.component';
import score from './components/score/score.component';

import takeQuizServices from './services/index.js';

export default angular.module('takeQuiz', [uirouter, takeQuizServices])
  .config(routing)
  .directive('takeQuiz', takeQuizComponent)
	.directive('questions', questions)
	.directive('score', score)
  .name;
