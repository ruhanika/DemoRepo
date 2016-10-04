
//import * as CalendarActions from '../../actions/calendar';

export default class  calnedarCtrl {
    constructor( $scope, $http, $state,$compile,ngDialog) {
       
        $scope.clickToOpen = function () {
            console.log("clickToOpen clickToOpen");
            ngDialog.openConfirm({
                template: '<time-zone-directive  get-time-zone="getTimeZone(selectedZone)" time-zone-array="timeZoneArray"></time-zone-directive>',
                plain: true,
                width: '40%',
                height:'80%',
                closeByDocument:false,
                showClose :false,
                className: 'ngdialog-theme-default timeZ',
                scope:$scope,
                controller: ['$scope', '$rootScope', function($scope, $rootScope) {/*
                   
                */}]
            });
        };

        $scope.clickToOpen();

       
        $scope.offset = "+5.5" ;
        $scope.timeZoneDiv = true;
        $scope.calendarDiv = false;
        $scope.daySelection = -1;
        $scope.timeSlot = false;

        $scope.timeZoneArray = [  
            {
              displayName:'India(UTC+5:30)',
              value:'+5.5'
            }
            ,{
                displayName:'Australia(UTC+10:00)',
                value:'+10.0'
            }
            ,{
                displayName:' United States(UTC-11:00)',
                value:'-11.0'
            }
        ];
      
        /* selecting time zone by user */
        $scope.getTimeZone = function(zone) {
            console.log(zone);
            ngDialog.close();
            if(zone == "") {
                return;
            } else {  
                $scope.offset = zone;
               // $scope.timeZoneDiv = true;
                $scope.calendarDiv = true;
            }
         }

        /* selecting date for meeting */
        $scope.clickDateCell = function(selectDay) {
            if(selectDay.isCurrentMonth && !(selectDay.isPastDay)) {// selected day not in disable days
                $scope.daySelection = selectDay.date;
                $scope.timeSlot = true;
            } else {
                return; //disable day select
            }
        }
   

        /*  adding dot icon to date cell after slot selected */
        $scope.clickTimeSlot = function(slotSelectedd) {
            if($scope.daySelection != -1 && slotSelectedd) {
                $scope.selected = $scope.daySelection;
            } else {
                $scope.selected = -1;
            }            
        }

    }// end of constructor
    mapStateToThis(state) {
        return {
            calendarObject: state.calendar
        };
    } 

}// end of class