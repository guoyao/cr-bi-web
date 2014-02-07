define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Admin Module", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function(done) {
            var that = this;
            this.shell = app[appInfo.moduleMap.shell.artifact];
            app.navigate(appInfo.moduleMap.admin.hash);
            setTimeout(function () {
                that.admin = that.shell[appInfo.moduleMap.admin.name];
                done();
            }, karmaOptions.asyncWaitTime);
        });

        after(function () {
            this.shell = this.admin = null;
            delete this.shell;
            delete this.admin;
        });

        it("should display admin module", function () {
            expect(app.currentModule).to.equal(this.admin);
        });
    });
});