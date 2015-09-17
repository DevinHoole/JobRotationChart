var app = angular.module('jobRotation');


app.controller('threadsCtrl', ['$scope', '$firebaseArray', 'threadsRef', function($scope, $firebaseArray, threadsRef) {

	//threadsRef is the result of calling getThreads() which just returns us new Firebase('THE FIREBASE URL' + /thread)
	//and $firebaseArray just makes it so it gives our data back to us as an Array
	$scope.threads = $firebaseArray(threadsRef);

    $scope.threads.$loaded().then(function (threads) {
      console.log(threads);
    });

	$scope.createThread = function(username, title) {
		$scope.threads.$add({
			username: username,
			title: title
		});
	};

}]);
