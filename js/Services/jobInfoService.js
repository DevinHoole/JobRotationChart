var app = angular.module("jobRotation");

app.service('jobInfoService', function(fb) {

this.getThreads = function(){
  return new Firebase(fb.url + '/jobInfothreads')
};

this.getThread = function(threadId){
  return new Firebase(fb.url + '/jobInfothreads/' + threadId)
};

this.getComments = function(threadId) {
  return new Firebase(fb.url + '/jobInfothreads/' + threadId + '/comments');
};

});
