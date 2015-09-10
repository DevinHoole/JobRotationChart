var app = angular.module('jobRotation');

// The functions are used to save the data to firebase, and then to randomly combine the Names with the Jobs
app.controller('randomizerCtrl', function($scope, $firebaseArray, $firebaseObject){
  $scope.randomize = false;


  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var namesRef = new Firebase("https://drh-job-rotation.firebaseio.com/names");
  $scope.names = $firebaseArray(namesRef);
  $scope.week = {};
  var jobsRef = new Firebase("https://drh-job-rotation.firebaseio.com/jobs");
  $scope.jobs = $firebaseArray(jobsRef);


  for(var i = 0; i < days.length; i++){
    var dayRef = new Firebase("https://drh-job-rotation.firebaseio.com/week/" + days[i]);
    $scope.week[days[i]] = $firebaseArray(dayRef);
  };

  dayRef.remove();

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
    // console.log(trackArr, arr2);
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


  $scope.hideMe = function() {
    return $scope.list4.length > 0;
  };

  // $scope.assignDay = function(crapUno, crapDos, day){
  //   console.log('dropped', day);
  //   $scope.onDragStop = function(crap1, crap2, job, name){
  //     console.log('stopped and dropped');
  //     if($scope.week[day]){
  //       $scope.week[day] = [];
  //     } else {
  //       $scope.week[day].push({name: name, job: job});
  //     }
  //   }
  // };

  $scope.onDragStop = function(crap1, crap2, job, name){
    console.log('stopped', job, name);
    $scope.assignDay = function(crapUno, crapDos, day){
      console.log('drop and stp')
      console.log($scope.week[day])
      $scope.week[day].$add({name: name, job: job.name});
    };
  };

});
