var app = angular.module('jobRotation');

// The functions are used to save the data to firebase, and then to randomly combine the Names with the Jobs
app.controller('randomizerCtrl', function($scope, $firebaseArray){
  $scope.randomize = false;

  $scope.week = [{name: "Sunday", assignments: []}, {name: "Monday", assignments: []}, {name: "Tuesday", assignments: []}, {name: "Wednesday", assignments: []}]

  var namesRef = new Firebase("https://drh-job-rotation.firebaseio.com/names");
  $scope.names = $firebaseArray(namesRef);

  var jobsRef = new Firebase("https://drh-job-rotation.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(jobsRef);

  function userJobs (id) {
    return $firebaseArray(new Firebase("https://drh-job-rotation.firebaseio.com/names/" + id + "/jobs"));
  }
  // $scope.addName = function(names) {
  //   $scope.names.$add({names: name, jobs: []});
  //   // console.log($scope.names);
  //   $scope.name = "";
  // };
  $scope.addName = function(name) {
    var newName = {
      name: name,
      jobs: []
    };
    console.log(newName);
    $scope.names.$add(newName);
    $scope.name = "";
  };

  $scope.addJob = function(job){
    var newJob = {
      name: job
    };
    $scope.jobs.$add(newJob);
    $scope.job = "";
  };


  $scope.randomizer = function(arr1, arr2){
    var trackArr = arr1.slice(); //makes a shallow copy
    console.log(trackArr, arr2);
    for(var i = 0; i < arr2.length; i++){
      if (!trackArr.length) {
        trackArr = arr1.slice();
      };
      var num = Math.floor(Math.random() * trackArr.length);
      var winner = userJobs(trackArr[num].$id);
      winner.$add(arr2[i]);
      // trackArr[num].jobs.push(arr2[i]);
      trackArr.splice(num, 1);
    }
    arr2.forEach(function(job, index){
      arr2.$remove(index);
    })
    arr2.$save();

    // for (var i = 0; i < $scope.jobs.length; i++) {
    //   $scope.oldJobs.push($scope.jobs[i]);
    // }

    // $scope.jobs = []; //allows you to contiune to add to the list of jobs
    // $scope.jobNamePairs = []
    // for(var i = 0; i < arr1.length; i++){
    //   for(var key in arr1[i].jobs){
    //     $scope.jobNamePairs.push({name: arr1[i].name, job: arr1[i].jobs[key].name})
    //     console.log($scope.jobNamePairs);
    //   }
    // }
    $scope.randomize = true;
  }

  // $scope.names = [];
  // $scope.jobs = [];
  // $scope.oldJobs = [];

});
