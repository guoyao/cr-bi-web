define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Index Module", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function(done) {
            var that = this;
            app.navigate(appInfo.moduleMap.index.hash);
            setTimeout(function () {
                that.shell = app[appInfo.moduleMap.shell.artifact];
                that.index = that.shell[appInfo.moduleMap.index.name];
                done();
            }, karmaOptions.asyncWaitTime);
        });

        after(function () {
            this.shell = this.index = null;
            delete this.shell;
            delete this.index;
        });

        it("should display index module", function () {
            expect(app.currentModule).to.equal(this.index);
        });

        it("should hide global query panel", function () {
            expect(this.shell.view.ui.globalQueryContainer.css("display")).to.equal("none");
        });
    });
});