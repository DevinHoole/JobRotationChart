var app = angular.module('jobRotation');

app.service('firebaseService', function ($firebase, $firebaseObject, $firebaseArray) {
  var firebaseUrl = 'https://drh-job-rotation.firebaseio.com/';

  this.getUser = function(userId){
    return $firebaseObject(new Firebase(firebaseUrl + 'users/' + userId));
  };

  this.getThings = function(userId){
    return $firebaseArray(new Firebase(firebaseUrl + 'users/' + userId + '/things'));
  }
})
