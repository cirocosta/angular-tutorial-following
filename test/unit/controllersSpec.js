'use strict';
/**
 * Performs a unit test on the controllers. This is great for testing
 * controllers and other components of our application written in
 * JavaScript but they can't easily test DOM manipulation or the wiring
 * of our application.
 * @see
 * http://code.angularjs.org/1.2.14/docs/guide/dev_guide.unit-testing
 */

/////////////////////////////////////////////////
////////////////////////////////////////////// //
// THIS IS ALL ABOUT TESTING UNITS OF CODE. // //
////////////////////////////////////////////// //
/////////////////////////////////////////////////

describe('PhoneCat controllers', function() {

    // loading 'phonecatApp' module definition before each test.
    beforeEach(function () {

        // adding a custom matcher so that we are able to check only the
        // data (properties) that two objects have and ignore the
        // different methods.

        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });

        // set the modules up

        module('phonecatApp');
        module('phonecatServices');
    });

    describe('PhoneListCtrl', function(){

        // mock a scope object. The $scope when writing controllers is
        // designed in that way (DI) for faciliting the job here. When
        // we did that we were just saying: in the future, when testing,
        // we'll be able to mock what goes to the view.
        var scope, ctrl, $httpBackend;


        // injecting $rootscope, $controller and $httpbackend services
        // into jasmine's beforeEach function. Doing this we get a mock
        // version of the service that in production environment
        // facilitates all XHR and JSONP requests.
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            // make httpBackend expect an incoming http request and tell
            // it what to responde with when the request is done. It is
            // like a training for what will come. Response won't be
            // emitted until httpBackend.flush is triggered.
            $httpBackend.expectGET('phones/phones.json')
                .respond([{name: 'Nexus S'}, {name:'Motorola DROID'}]);

            // creating a new scope
            scope = $rootScope.$new();
            // PhoneListCtrl is registred within the phonecatApp module.
            // Because of that, we have then to use the Angular service
            // $controller which will retrieve the controller we want by
            // its name.
            scope = {};
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));


        it('should create "phone" model with 2 phones fetched from xhr',
           function () {

            // before the call we must not have a "phones" model
            // defined.
            expect(scope.phones).toEqualData([]);
            // then the http method is triggered
            $httpBackend.flush();

            // now, if the correct get was made, then scope.phones
            // should be defined and should contain what we expect.
            expect(scope.phones).toEqualData([
                {name: 'Nexus S'},{name: 'Motorola DROID'}
            ]);
        });

        // the initialization of the #scope.orderProp must be what we
        // expect.
        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });


    describe('PhoneDetailCtrl', function () {

        var scope, $httpBackend, ctrl;

        var xyzPhoneData = {
            name: 'phone xyz',
            images: ['image/url1.png', 'image/url2.png']
        };

        beforeEach(inject(
           function (_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json')
                .respond({name: 'phone xyz'});

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
        }));

        it("should fetch phone detail", function () {
            expect(scope.phone).toEqualData({});
            $httpBackend.flush();
            expect(scope.phone).toEqualData(xyzPhoneData);
        });

    });
});