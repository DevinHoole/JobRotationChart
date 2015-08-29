var app = angular.module('jobRotation');

// functions used to generate lists then assign them together randomly.
app.controller('randomizerCtrl', function($scope){
  $scope.randomize = false;

  $scope.addName = function(name) {
    $scope.names.push({name: name, jobs: []});
    // console.log($scope.names);
    $scope.name = "";
  };

  $scope.addJob = function(job){
    // console.log(job);
    // $scope.jobs.push(job);
    $scope.jobs.push(job);
    // console.log($scope.jobs);
    $scope.job = "";
  };

  $scope.randomizer = function(arr1, arr2){
    var trackArr = arr1.slice(); //makes shallow copy
    for(var i = 0; i < arr2.length; i++){
      if (!trackArr.length) {
        trackArr = arr1.slice();
      }
      var num = Math.floor(Math.random() * trackArr.length);
      trackArr[num].jobs.push(arr2[i]);
      trackArr.splice(num, 1);
    }

    for (var i = 0; i < $scope.jobs.length; i++) {
      $scope.oldJobs.push($scope.jobs[i]);
    }

    $scope.jobs = []; //allows you to contiune to add to the list of jobs
    $scope.randomize = true;
  }

  $scope.names = [];
  $scope.jobs = [];
  $scope.oldJobs = [];

});
