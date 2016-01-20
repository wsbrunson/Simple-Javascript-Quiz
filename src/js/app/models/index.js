import angular from 'angular';

import QuizModel from './QuizModel/Quiz.model.js';

export default angular.module('models', [])
  .service('QuizModel', QuizModel)
  .name;
