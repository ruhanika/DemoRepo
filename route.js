import calendarTemplate from './app/components/calendar/template.html';

import calendarCtrl from './app/components/calendar/controller.js';

/**
   * @name routes
   * @desc routes entry
   * @param $stateProvider, $urlRouterProvider, $locationProvider
   * @returns 
   */
export default function routes($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('main', {
			abstract: true,
			template: '<ui-view/>'
		})
		
		 .state('main.calendar', {
			url: '/calendar',
			template: calendarTemplate,
			controllerAs: 'calendarCtrl',
            controller: calendarCtrl
		});

		$urlRouterProvider.otherwise('/');
}