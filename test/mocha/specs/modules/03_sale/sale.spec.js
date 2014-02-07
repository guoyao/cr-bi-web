define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Sale Module", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function(done) {
            var that = this;
            app.navigate(appInfo.moduleMap.sale.hash);
            setTimeout(function () {
                that.shell = app[appInfo.moduleMap.shell.artifact];
                that.sale = that.shell[appInfo.moduleMap.sale.name];
                done();
            }, karmaOptions.asyncWaitTime);
        });

        after(function () {
            this.shell = this.sale = null;
            delete this.shell;
            delete this.sale;
        });

        it("should display sale module", function () {
            expect(app.currentModule).to.equal(this.sale);
        });

        it("should display global query panel", function () {
            expect(this.shell.view.ui.globalQueryContainer.css("display")).to.not.equal("none");
        });
    });
});