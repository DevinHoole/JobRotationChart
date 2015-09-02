var app = angular.module('jobRotation');

app.controller('mainCtrl', function($rootScope, authService){
  var authData = authService.getAuthData();
  authData.$onAuth(function(data){
  $rootScope.authData = data;
  console.log(data);
  });
});
