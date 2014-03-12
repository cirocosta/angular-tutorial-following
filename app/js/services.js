// TODO : explain this better

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

// passing here the name of the service ('Phone') and also the factory
// function. This is similar to a controller's constructor in the way
// that both can declare its dependencies via function args. This one,
// e.g, requires $resouce service.
phonecatServices.factory('Phone', ['$resource', function ($resource) {

    // $resource creates a resource object that will let us interact
    // $with RESTful server-side data sources. This will let us don't
    // $depende on the low level $http service.

    // $resource(url, [paramDefaults], [actions])
    return $resource('phones/:phoneId.json', {}, {
        query: {
            method: 'GET',
            params: {
                phoneId: 'phones'
            },
            isArray: true
        }
    });

}]);