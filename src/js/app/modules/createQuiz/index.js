import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './createQuiz.routes';
import createQuizComponent from './createQuiz.component';

//import createQuizServices from './services/index.js';

export default angular.module('createQuiz', [uirouter])
  .config(routing)
  .directive('createQuiz', createQuizComponent)
  .name;
