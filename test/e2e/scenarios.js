'use strict';
/**
 * Different from the unit tests at ../unit, E2E tests are made for
 * testing DOM response to events and other stuff that are wired in our
 * application.
 * @see  http://docs.angularjs.org/guide/dev_guide.e2e-testing Another
 * great reference is:
 * https://github.com/angular/protractor/blob/master/docs/getting-started.md,
 * which i'll be using in a further release.
 *
 * Seeing the page of the karma-ng-scenario, it recomends to go with
 * Protractor for this e2e stuff. Seems like karma-ng-scenario is no
 * longer mantained.
 *
 * TODO: change everything to protractor :P
 */


describe('PhoneCat App', function () {

    describe('Phone list view', function () {

        // before each of the tests inside this `describe` we are going
        // to navigate to the app/index.html file in the server so that
        // we are going to perform the dom manipulation in the right
        // place.
        beforeEach(function () {
            // browser is wrapper around an instance of webdriver.
            // Provides navigation and page-wide info.
            browser().navigateTo('../../app/index.html');
        });


        it('should filter the phone list as user types into the search box',
           function() {

            // testing if the repeater is perfectly binded to the data
            // that we have.
            expect(repeater('.phones li').count()).toBe(20);

            // verify if the search box is really filtering what it
            // should, i.e, it verifies if the input and the repeater
            // are correctly wired together.
            input('query').enter('nexus');
            expect(repeater('.phones li').count()).toBe(1);

            // the same as the last one but for a different query.
            input('query').enter('motorola');
            expect(repeater('.phones li').count()).toBe(8);
        });

        it('should be able to control phone order via dropdown select box',
            function () {
                input('query').enter('tablet');
                expect(repeater('.phones li', 'Phone List').column('phone.name')).
                  toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                           "MOTOROLA XOOM\u2122"]);

                select('orderProp').option('Alphabetical');

                expect(repeater('.phones li', 'Phone List').column('phone.name')).
                  toEqual(["MOTOROLA XOOM\u2122",
                           "Motorola XOOM\u2122 with Wi-Fi"]);
            }
        );
    });
});