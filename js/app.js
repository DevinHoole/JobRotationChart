var app = angular.module('jobRotation', ['ngRoute', 'firebase', 'ngDragDrop']);

app.constant('fb' , {
  url: "https://drh-job-rotation.firebaseio.com/"});

app.config(function($routeProvider) {

$routeProvider
    .when('/', {
        templateUrl: "Views/home.html",
        controller: "loginCtrl"
    })
    .when('/registration', {
        templateUrl: "Views/registration.html",
        controller:"registrationCtrl"
    })
    // .when('/jobDetails', {
    //     templateUrl: "Views/jobDetails.html",
    //     controller: "jobDetailsCtrl"
    // })
    .when('/jobDetails', {
        templateUrl: 'Views/threads.html',
        controller: 'threadsCtrl',
        resolve: {
          threadsRef: function(threadService) {
            return threadService.getThreads();
          }
        }
    })
    .when('/threads/:threadId', {
        templateUrl: 'Views/thread.html',
        controller: 'threadCtrl',
        resolve: {
          threadRef: function (threadService, $route) {
                return threadService.getThread($route.current.params.threadId);
            },
            commentsRef: function (threadService, $route) {
              return threadService.getComments($route.current.params.threadId);
            }
        }
    })
    .when('/jobAssignment', {
        templateUrl: "Views/jobAssingments.html",
        controller: "randomizerCtrl"
    })

    .otherwise({
        redirectTo: '/'
    });
  });
