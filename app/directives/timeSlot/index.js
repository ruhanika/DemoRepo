
export default function timeSlot() {
	return {
		restrict: 'E',
	    template: require('./template.html'),
	    scope: {
	    	 checkedSlot:"&"  //isolated function
	    },
	    link: function(scope, iElement, iAttrs) {
	    
	 }
}
};
