var app = angular.module('jobRotation', ['ngRoute', 'firebase']);

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
    .when('/jobDetails', {
        templateUrl: "Views/jobDetails.html",
        controller: "jobDetailsCtrl"
    })
    .when('/jobAssignment', {
        templateUrl: "Views/jobAssingments.html",
        controller: "randomizerCtrl"
    })
    .when("/threads", {
        templateUrl: "View/jobInfoThreads.html",
        controller: "jobInfothreadsCtrl",
        resolve: {
          threadsRef: function(jobInfoService){
            return jobInfoService.getThreads();
          }
        }
     })
    .when("/threads/:threadId", {
      templateUrl: 'View/jobInfoThread.html',
      controller: 'jobInfoThreadCtrl',
      resolve: {
        threadRef: function(threadsService, $route){
          return threadsService.getThread($route.current.params.threadId);
        },
        commentsRef: function(threadsService, $route){
          return threadsService.getComments($route.current.params.threadId);
        }
      }
    })
    .otherwise({
        redirectTo: '/'
    });
  });
