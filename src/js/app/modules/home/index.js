import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import homeComponent from './home.component';

export default angular.module('home', [uirouter])
  .config(routing)
  .directive('home', homeComponent)
  .name;
