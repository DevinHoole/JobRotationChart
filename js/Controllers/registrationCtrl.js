var app = angular.module('jobRotation');

app.controller('registrationCtrl' function($scope, authService, $location userReference, thingsReference){


  //Step 2 of Registration
  $scope.register = function () {
    return authService.register($scope.details, loginCallback);
  };

  $scope.status = 'Register';
  $scope.showReg = function(){
    if($scope.status === 'Register'){
      $scope.status = 'Login';
    } else {
      $scope.status = 'Register';
    }
    $scope.reg = !$scope.reg;
  };
})

//Step 4 of Registration
var loginCallback = function(user){
  user.uid = user.uid.replace('simplelogin:', '');
  $location.path('/dashboard/' + user.uid)
};

$scope.login = function () {
  return authService.login($scope.details, loginCallback);
};

$scope.profile = userReference;
$scope.things = thingsReference;
$scope.addThing = function(){
  $scope.things.$add($scope.thing);
}
$scope.removeThing = function(thing){
  $scope.things.$remove(thing);
}
$scope.update = function(){
  $scope.profile.$save();
};
});
});
