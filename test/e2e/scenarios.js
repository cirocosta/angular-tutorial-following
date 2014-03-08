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
 * For running tests, Protractor, which is a wrapper around WebDriverJS,
 * needs to talk to a Selenium standalone server running as a separate
 * process.
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
            browser.get('../../app/index.html');

        });


        it('should filter the phone list as user types into the search box',
           function() {

            var phoneList;

            // testing if the repeater is perfectly binded to the data
            // that we have.

            phoneList = element.all(by.repeater('phone in phones'));
            expect(phoneList.count()).toBe(20);


            // verify if the search box is really filtering what it
            // should, i.e, it verifies if the input and the repeater
            // are correctly wired together.

            element(by.model('query')).sendKeys('nexus');
            expect(element.all(by.repeater('phone in phones')).count())
                .toBe(1);

        });

        it('should be able to control phone order via dropdown select box',
            function () {

                // send the 'tablet' input to the 'query' model.
                element(by.model('query')).sendKeys('tablet');

                // get a reference to the ngRepeater directive 'phone in
                // phones' but just for the 'name' colum of the phones.

                var elems = element.all(by.repeater('phone in phones').column('name'));

                // get the first element:
                elems.first().then(function (elem) {
                    expect(elem.getText()).toBe("Motorola XOOM™ with Wi-Fi");
                });

                // select the option with 'value=name' and then perform
                // the click.

                element(by.css('select option[value="name"]')).click();

                // we don't have to call `element.all...` again because
                // elems is just a pointer to something, and not a list
                // with all the elements and etc.

                // get the first element and let's see what it is within
                // it.
                elems.first().then(function (elem) {
                    expect(elem.getText()).toBe("MOTOROLA XOOM\u2122");
                });
            }
        );
    });
});