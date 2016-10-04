/**
 * Index.
 * @constructor
 * @ngInject
 * @export
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngDialog from 'ng-dialog';
import routes from './route';
import timeZone from './app/directives/timeZone/index';
import calendar from './app/directives/calendar/index';
import timeSlot from './app/directives/timeSlot/index';

require("./node_modules/ng-dialog/css/ngDialog.css");
require("./node_modules/ng-dialog/css/ngDialog-theme-default.css");

angular.module('demo', [ngDialog, uiRouter])
	.config(routes)
    
    
   .directive('timeZoneDirective',timeZone)
   .directive('calendar',calendar)
   .directive('timeSlotDirective',timeSlot)
  
    