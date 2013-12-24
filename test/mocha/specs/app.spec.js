define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        app = require("app");

    // Test that the app start succeed.
    describe("App", function () {
        it("should started", function () {
            expect(app).to.exist;
            expect(app).to.be.an.instanceof(Marionette.Application);
        });
    });
});