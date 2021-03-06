'use strict';
/**
 * What makes our application unique is its LOGIC. And LOGIC is what we
 * want to test. If the logic contains DOM manipulation we're fucked up.
 */


var phonecatControllers = angular.module('phonecatControllers', []);


// defining the controllers that this module contains. It's parameters
// are as the following: NameOfTheController, [Dependencies,, Function].
phonecatControllers.controller('PhoneListCtrl',
    ['$scope', '$http', function ($scope, $http) {


    // here we use $http angularjs service. AngularJS services are
    // singletons objects of functions that carry out specific tasks
    // that are common to webapps. To use it, we identify it as a
    // dependency for the component that depends on it. Services are
    // managed by Angular's dependency injection subsystem.

    // $http returns a Promise Object with a success method. We, then,
    // $call this to handle the async response and assign the phone data
    // $to the scope controlled by this controller.

    $http.get('phones/phones.json').success(function (data) {
        // angular detects that we are dealing with a json file and
        // parses it for us.
        $scope.phones = data;
    });

    // setting the initial orderProp
    $scope.orderProp = 'age';
}]);

phonecatControllers.controller('PhoneDetailCtrl',
    ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {

        // performing a GET to a url that contains the JSON that
        // represents the phone that we want to see the details.
        $http.get('phones/' + $routeParams.phoneId + '.json')
            .success(function (data) {
                $scope.phone = data;
                $scope.mainImageUrl = data.images[0];
            });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
}]);
