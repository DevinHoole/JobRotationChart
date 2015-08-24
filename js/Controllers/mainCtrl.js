var app = angular.module('jobRotation');

// functions used to generate lists then assing them together.
app.controller('mainCtrl', function($scope){
  $scope.addName = function(name) {
    $scope.names.push({name: name, jobs: []});
    $scope.name = "";
  };

  $scope.addJob = function(job){
    console.log(job);
    $scope.jobs.push(job);
    $scope.job = "";
  };

  $scope.names = [];
  $scope.jobs = [];

  $scope.randomizer = function(arr, arr2){
    var trackArr = arr.slice(); //makes shallow copy
    for(var i = 0; i < arr2.length; i++){
      if(!trackArr.length) trackArr = arr.slice();

      var num = Math.floor(Math.random() * trackArr.length);
      trackArr[num].jobs.push(arr2[i]);
      trackArr.splice(num, 1);
    }
    $scope.jobs = [];
  }
});
