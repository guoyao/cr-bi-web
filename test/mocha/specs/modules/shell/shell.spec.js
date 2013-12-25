define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info");

    // Test that the app start succeed.
    describe("Shell", function () {
        before(function(){
            this.shell = app[appInfo.moduleMap.shell.artifact];
        });

        after(function () {
            this.shell = null;
        });

        it("should started after login", function () {
            expect(this.shell).to.exist;
            expect(this.shell._isInitialized).to.be.true;
        });

        it("should display index module when no location.hash specified", function () {
            var indexModule = this.shell[appInfo.moduleMap.index.name];
            expect(indexModule).to.exist;
            expect(indexModule._isInitialized).to.be.true;
        });
    });
});