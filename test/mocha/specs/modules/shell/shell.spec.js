define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        app = require("app"),
        appInfo = require("app_info"),
        karmaOptions = window.__karma__.options;

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

        it("should display sale module when location.hash equals sale module's hash", function (done) {
            var that = this;
            setTimeout(function () {
                app.navigate(appInfo.moduleMap.sale.hash);
                setTimeout(function () {
                    var saleModule = that.shell[appInfo.moduleMap.sale.name];
                    expect(saleModule).to.exist;
                    expect(saleModule._isInitialized).to.be.true;

                    var indexModule = that.shell[appInfo.moduleMap.index.name];
                    expect(indexModule._isInitialized).to.be.false;
                    expect(app).to.have.property("currentModule", saleModule);
                    done();
                }, karmaOptions.asyncWaitTime);
            }, karmaOptions.asyncWaitTime / 2);
        });

        it("should display index module when index menu clicked", function (done) {
            var indexModule = this.shell[appInfo.moduleMap.index.name],
                $indexMenu = $(".js-header .gui-nav [href=#" + appInfo.moduleMap.index.hash + "]");
            $indexMenu.click(function () {
                window.location.hash = $indexMenu.attr("href");
                setTimeout(function () {
                    expect(indexModule._isInitialized).to.be.true;
                    expect(app).to.have.property("currentModule", indexModule);
                    done();
                }, karmaOptions.asyncWaitTime);
            });
            $indexMenu.trigger("click");
        });
    });
});