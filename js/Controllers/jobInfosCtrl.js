var app = angular.module("jobRotation");

app.controller('jobInfoThreadsCtrl', function ($scope, threadsRef, $firebaseArray) {

    $scope.jobInfoThreads = $firebaseArray(threadsRef)

    $scope.jobInfoThreads.$loaded().then(function(jobInfoThreads){
      console.log(jobInfoThreads);
    });

    $scope.createThread = function(username, title){
      $scope.jobInfoThreads.$add({
        username: username,
        title: title
      });
    };
  });
