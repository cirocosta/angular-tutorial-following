'use strict';
/**
 * Prepares what it has to be done when the first page of the
 * application is just loaded.
 */


// Defining a module for our entire application. For the second
// parameter of this, we are passing a list containing ngRoute and
// phonecatControllers. This list contains the stuff (other modules)
// that phonecatApp module depends on.
var phonecatApp = angular.module('phonecatApp',[
    'ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatServices'
]);

// using `config` we are fully able to inject the $routeProvider to the
// function and then use the `when` API to define our routes.
phonecatApp.config(['$routeProvider',

    function ($routeProvider) {
        $routeProvider
            .when('/phones', {
                templateUrl: 'partials/phone-list.html',
                controller: 'PhoneListCtrl'
            })
            // :phoneId is a variable part of the URL. All variables
            // :defined with the `:` notation are extracted into the
            // :$routeParams object.
            .when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            })
            .otherwise({
                redirectTo: '/phones'
            });
}]);