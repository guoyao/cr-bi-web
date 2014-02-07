define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        stringUtil = require("modules/api/utils/string_util"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Login Module", function () {
        this.timeout(karmaOptions.asyncWaitTime * 5);

        before(function(done){
            var that = this;
            setTimeout(function () {
                that.login = app[appInfo.moduleMap.login.artifact];
                done();
            }, karmaOptions.asyncWaitTime);
        });

        after(function () {
            this.login = null;
            delete this.login;
        });

        it("should started", function () {
            expect(this.login._isInitialized).to.be.true;
        });

        it("should login failed if username or password not correct", function (done) {
            var that = this;
            this.login.view.login();
            setTimeout(function () {
                expect(stringUtil.isBlank(that.login.view.ui.errorMessage.text())).to.be.false;
                done();
            }, karmaOptions.asyncWaitTime);
        });

        it("should login succeed and display shell module if username and password are correct", function (done) {
            var that = this;
            this.login.view.ui.username.val("changju");
            this.login.view.ui.password.val("123456");
            this.login.view.login();
            setTimeout(function () {
                var shellModule = app[appInfo.moduleMap.shell.artifact];
                expect(shellModule).to.exist;
                expect(that.login._isInitialized).to.be.false;
                expect(shellModule._isInitialized).to.be.true;
                done();
            }, karmaOptions.asyncWaitTime);
        });
    });
});