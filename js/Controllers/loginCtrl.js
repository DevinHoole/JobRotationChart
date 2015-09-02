var app = angular.module('jobRotation');

app.controller('loginCtrl', function($scope, authService, firebaseService){
  $scope.login = function(){
    var loginInfo = authService.login($scope.details, function(data){
      console.log(firebaseService.getUser(data.uid));
    });
  }
  $scope.helper = function(){
    $scope.details = {
      email: 'theblackwookie@hotmail.com',
      password:'123456'
    };
  }
  $scope.logOut = function(){
    authService.logout();
  }

});
