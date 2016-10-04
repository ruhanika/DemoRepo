
export default function calendar($compile) {
	return {
		restrict: 'E',
	    template: require('./template.html'),
	    scope: {
	    	selectCell:"&",
            selected:"=",
            offset:"=offset"
	    },
	    link: function(scope, iElement, iAttrs) {	   
            scope.$watch("offset", function(newValue, oldValue) {                
                if(newValue && newValue != oldValue) {
                    scope.offset = newValue;
                    init(scope.offset); 
                }                              
            });   
            
            
            function init(offset) {                
                scope.anglePrev = true;
                scope.disableArray = [];
                scope.currentZoneTime = getTimeForSelectedTimeZone(offset);
                scope.curentZoneDateDay = scope.currentZoneTime.toDate();
                scope.month = scope.currentZoneTime.clone();
                var m = scope.month._d;
                var mon = m.getMonth();
                scope.previousMonth = scope.currentZoneTime.clone().month(mon - 1);
                scope.nextMonth = scope.currentZoneTime.clone().month(mon + 1);
                var start = scope.currentZoneTime.clone();
                start.date(1); //get 1st date
                start.day(0); //get sunday
                _buildMonth(scope, start, scope.month);                
            }

            init(scope.offset);
            
            scope.next = function() {
                var currentMonth = scope.month.clone();
                var next = currentMonth.clone();
                var m = next._d;
                var mon = m.getMonth();
                scope.previousMonth = currentMonth.clone().month(mon);
                scope.nextMonth = currentMonth.clone().month(mon+2);
                next.month(next.month()+1).date(1); //get next month 1st date
                next.day(0); //get sunday
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
                scope.anglePrev = false;
                    
            };

            scope.previous = function() {
                var currentMonth = scope.month.clone();
                var previous    = scope.month.clone();
                var m = scope.month._d; 
                var mon = m.getMonth();
               if((previous.year() == scope.currentZoneTime.year()) && previous.month() == scope.currentZoneTime.month())//if current month calendar
                return;
               if((previous.year() == scope.currentZoneTime.year()) && previous.month() == scope.currentZoneTime.month()+1)//if previous is current month
                  scope.anglePrev = true; //disable prev arr

                previous.month(previous.month()-1).date(1);//get previous month 1st date
                previous.day(0);//get sunday
                scope.month.month(scope.month.month()-1);
               _buildMonth(scope, previous, scope.month);
                scope.previousMonth = currentMonth.clone().month(mon-2);
                scope.nextMonth = currentMonth.clone().month(mon);
            };

           /* enable disable days for selected month*/
            scope.checkDay=function(value) {
                if(scope.disableArray.length > 0) {
                    var flag = 0;
                    for(var i = 0; i < scope.disableArray.length; i++) {
                        if(scope.disableArray[i] == value.number) {
                            flag = 1;
                            return true;
                        }
                    }
                    if(flag == 0) {
                        return false; 
                    }
                }
            } //end of check day
       
        
            function getTimeForSelectedTimeZone(offset){
                var d = new Date();
                var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                var nd = new Date(utc + (3600000*offset));
                var momentObj = moment(nd);
                return momentObj;
            }

            function _removeTime(date) {
                return date.day(0).hour(0).minute(0).second(0).millisecond(0);
            }

            function _buildMonth(scope, start, month) {
                scope.weeks = [];
                scope.disableArray = [];
                var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                while (!done) {
                    scope.weeks.push({ days: _buildWeek(date.clone(), month,scope) });
                    date.add(1, "w");
                    done = count++ > 2 && monthIndex !== date.month();
                    monthIndex = date.month();
                }
            }

            function _buildWeek(date, month,scope) {
                var days = [];
                for (var i = 0; i < 7; i++) {
                    days.push({
                        name: date.format("dd").substring(0, 1),                        
                        isCurrentMonth: date.month() === month.month(),
                        number: date.date(),
                        isPastDay: !(date.month() === month.month()) || ((date.month() === scope.currentZoneTime.month()) && (date.year() === scope.currentZoneTime.year()) && date.date()<scope.curentZoneDateDay.getDate()),
                        isToday: date.isSame(scope.curentZoneDateDay, "day"),
                        date: date
                    });
                    date = date.clone();
                    date.add(1, "d");
                    /* adding  disable days in array while loading current motnh calendar*/
                    if(days[i].isCurrentMonth==false){
                        scope.disableArray.push(days[i].number);
                    } else if(days[i].isCurrentMonth && days[i].date < scope.curentZoneDateDay && !(days[i].isToday) ){
                        scope.disableArray.push(days[i].number);
                    }
                }
                return days;
            }
        } // end of link function
    }
};// end of controller