
export default function timeZone() {
	return {
		restrict: 'E',
	    template: require('./template.html'),
	    scope: {
	    	timeZoneArray:"=",
	    	getTimeZone:"&",
	    },
	    link: function(scope, iElement, iAttrs) {		    
	        scope.submitTimeZone = function(zone) {
	        	scope.getTimeZone(zone);
	        }
		}
	}
};
