define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Index Module", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function() {
            this.shell = app[appInfo.moduleMap.shell.artifact];
            this.index = this.shell[appInfo.moduleMap.index.name];
        });

        after(function () {
            this.shell = this.index = null;
            delete this.shell;
            delete this.index;
        });

        it("should hide global query panel", function () {
            expect(this.shell.view.ui.globalQueryContainer.css("display")).to.equal("none");
        });
    });
});