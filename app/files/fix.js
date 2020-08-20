//https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating

var app = angular.module('myApp', ['ngRoute', 'ngMessages']);

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
      removeAllListeners: function (eventName, callback) {
          socket.removeAllListeners(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
          }); 
      }
  };
});

//the following contains "routes" or the web pages injected into the template page
//template defines the template the page is injected into
//controller defines what the rules and data available for the page are

//used for datepicker and date inserting
app.directive('datepickerPopup', function (dateFilter, $parse){
    return {
        restrict: 'EAC',
        require: '?ngModel',
        link: function(scope, element, attr, ngModel,ctrl) {
            ngModel.$parsers.push(function(viewValue){
                return dateFilter(viewValue, 'yyyy-MM-dd');
    });
    }
  }
});


//defines the rules and data available to the web page
//more efficient use of the server
app.controller('data_get', function($scope, $http, socket){
$scope.LoggedIn = "Logout";
//$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
//$scope.redirect = function(){window.location = "/MS.html";};    
$http.get('/DB/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});

});

app.controller('data_openM', function($scope, $http, socket){
$scope.LoggedIn = "Logout";
//$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
//$scope.redirect = function(){window.location = "/MS.html";};    
$http.get('/OPENREQMONTH/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});

});

app.controller('data_open', function($scope, $http, socket){
$scope.LoggedIn = "Logout";
//$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
//$scope.redirect = function(){window.location = "/MS.html";};    
$http.get('/OPEN/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});

});

app.controller('data_closed', function($scope, $http, socket){
$scope.LoggedIn = "Logout";
//$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
//$scope.redirect = function(){window.location = "/MS.html";};    
$http.get('/CLOSED/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});

});

app.controller('data_set', function($scope, $http, socket){
$scope.LoggedIn = "Logout";
$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
$scope.redirect = function(){window.location = "/MS.html";};    
//$http.get('/DB/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});
    
    $scope.ticket.t_PDisplay = "No";
    $scope.ticket.t_PPressRel = "No";
    $scope.ticket.t_PBroch = "No";
    $scope.ticket.t_PFlyer = "No";
    $scope.ticket.t_PPoster = "No";
    $scope.ticket.t_PBookmark = "No";
    $scope.ticket.t_PBanner = "No";
    $scope.ticket.t_PNotNew = "No";
    $scope.ticket.t_Some = "No";
    $scope.ticket.t_HavePho = "No";
    $scope.ticket.t_TheLogoMight = "No";
    $scope.ticket.t_PleaseDesign = "No";
    $scope.ticket.t_PrintColor = "No";
    $scope.ticket.t_BW = "No";
    $scope.ticket.t_HaveCopy = "No";
    $scope.ticket.t_PPhotoBooth = "No";
});

app.controller('data_ticket', function($scope, $http, socket, $routeParams){  
$scope.updticket = function(ticket){socket.emit('update_ticket', ticket)};
    $scope.redirect = function(){window.location = "/MS.html";};    
$http.get('/ticket/'+$routeParams.id).success(function(data){$scope.x=data; $scope.ticket.t_Location= $scope.x.v_Location; $scope.ticket.t_Department= $scope.x.v_Department; $scope.ticket.t_Name= $scope.x.v_Name; $scope.ticket.t_Email= $scope.x.v_Email; $scope.ticket.t_Phone= $scope.x.v_Phone; $scope.ticket.t_Program= $scope.x.v_Program; $scope.ticket.t_Program= $scope.x.v_Program; $scope.ticket.t_Unlisted= $scope.x.v_Unlisted; $scope.ticket.t_Completed= $scope.x.v_Completed; $scope.ticket.t_PDisplay= $scope.x.v_PDisplay; $scope.ticket.PPressRel= $scope.x.PPressRel; $scope.ticket.t_PBroch= $scope.x.v_PBroch; $scope.ticket.t_PFlyer= $scope.x.v_PFlyer; $scope.ticket.t_PPoster= $scope.x.v_PPoster; $scope.ticket.t_PBookmark= $scope.x.v_PBookmark; $scope.ticket.t_PBanner= $scope.x.v_PBanner; $scope.ticket.t_PPhotoBooth= $scope.x.v_PPhotoBooth; $scope.ticket.t_PNotNew= $scope.x.v_PNotNew; $scope.ticket.t_Some= $scope.x.v_Some; $scope.ticket.t_HavePho= $scope.x.v_HavePho; $scope.ticket.t_TheLogoMight= $scope.x.v_TheLogoMight; $scope.ticket.t_PleaseDesign= $scope.x.v_PleaseDesign; $scope.ticket.t_PrintColor= $scope.x.v_PrintColor; $scope.ticket.t_BW= $scope.x.v_BW; $scope.ticket.t_HaveCopy= $scope.x.v_HaveCopy; $scope.ticket.t_PPressRel= $scope.x.v_PPressRel; $scope.ticket.t_PRCom= $scope.x.v_PRCom; $scope.ticket.fTicketId = $scope.x.id;});
    
});


//needed for the datepicker functions
app.controller('Datepicker', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2070, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
});


    
