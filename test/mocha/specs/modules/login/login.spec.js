define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info"),
        stringUtil = require("modules/api/utils/string_util"),
        karmaOptions = window.__karma__.options;

    // Test that the app start succeed.
    describe("Login Module", function () {
        before(function(){
            this.login = app[appInfo.moduleMap.login.artifact];
            this.loginView = this.login.view;
        });

        after(function () {
            this.login = null;
            this.loginView = null;
        });

        it("should started", function () {
            expect(this.login._isInitialized).to.be.true;
        });

        it("should login failed if username or password not correct", function () {
            this.loginView.login();
            expect(stringUtil.isBlank(this.loginView.ui.errorMessage.text())).to.be.false;
        });

        it("should login succeed and display shell module if username or password are correct", function (done) {
            this.loginView.ui.username.val("changju");
            this.loginView.ui.password.val("123456");
            this.loginView.login();
            expect(stringUtil.isBlank(this.loginView.ui.errorMessage.text())).to.be.true;
            var that = this;
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