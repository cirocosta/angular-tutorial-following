describe('PhoneCatApp', function () {
    describe('Phone list view', function () {
        beforeEach(function () {
            browser().navigateTo('../../app/index.html');
        });

        it("should filter the phone list as the user types", function () {
            expect(repeater('.phones li').count()).toBe(3);

            input('query').enter('nexus');
            expect(repeater('.phones li').count()).toBe(1);

            input('query').enter('motorola');
            expect(repeater('.phones li').count()).toBe(2);
        });
    });
});