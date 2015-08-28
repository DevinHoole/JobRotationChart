var app = angular.module('jobRotation', ['ngRoute']);

app.config(function($routeProvider) {

$routeProvider
    .when('/', {
        templateUrl: "Views/home.html",
        controller: "mainCtrl"
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
    .otherwise({
        redirectTo: '/'
    });
});
