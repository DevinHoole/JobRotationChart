var app = angular.module('jobRotation');

app.service('threadService', function(FB) {

	this.getThreads = function() {
		return new Firebase(FB.url + '/threads');
	};

	this.getThread = function(threadId) {
		return new Firebase(FB.url + '/threads/' + threadId);
	};

	this.getComments = function(threadId) {
		return new Firebase(FB.url + '/threads/' + threadId + '/comments');
	};

});
