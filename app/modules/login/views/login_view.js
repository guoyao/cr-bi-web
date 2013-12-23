define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        app = require("app"),
        util = require("utils/util"),
        template = require("text!templates/login/login.html");

    var LoginView = Marionette.ItemView.extend({
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
                app.login.trigger("login:succeed", {
                    username: username,
                    position: "系统管理员",
                    permission: "全部"
                });
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

    return LoginView;
});