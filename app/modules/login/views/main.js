define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/login/main.html"),
        gui = require("gui"),
        util = require("utils/util");

    var Main = Marionette.ItemView.extend({
        template: template,
        className: "login",
        ui: {
            username: "#username",
            password: "#password",
            errorMessage: ".error"
        },
        events: {
            "click #loginBtn": "login",
            "click #resetPasswordBtn": "resetPassword",
            "keydown input": "onKeyDown"
        },
        onShow: function () {
            this.ui.username.focus();
        },
        login: function () {
            var username = this.ui.username.val(),
                password = this.ui.password.val();
            if (!util.string.isBlank(username) && !util.string.isBlank(password) && username == "changju" && password == "123456") {
                util.app.login(username);
            } else {
                this.ui.errorMessage.text("用户名或密码错误");
                var errorMessageContainer = this.ui.errorMessage.parent().parent();
                errorMessageContainer.fadeIn();
            }
        },
        resetPassword: function () {
            console.log("reset password button clicked");
        },
        onKeyDown: function (event) {
            // press enter
            if (event.keyCode == 13) {
                this.login();
            }
        }
    });

    return Main;
});