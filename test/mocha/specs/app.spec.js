define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("App", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function (done) {
            setTimeout(function () {
                done();
            }, karmaOptions.asyncWaitTime);
        });

        it("should started", function () {
            expect(app).to.exist;
            expect(app).to.be.an.instanceof(Marionette.Application);
        });

        it("should display login module", function () {
            expect(app).to.not.have.property(appInfo.moduleMap.shell.artifact);
            expect(app).to.have.property(appInfo.moduleMap.login.artifact).that.exist;
        });
    });
});