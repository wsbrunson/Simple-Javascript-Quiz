import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './app.config';
import home from './modules/home';
import takeQuiz from './modules/takeQuiz';
import createQuiz from './modules/createQuiz';

import services from './services';

angular.module('SimpleQuiz', [uiRouter, services, home, takeQuiz, createQuiz])
	.config(routing);
