define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        Marionette = require("marionette"),
        app = require("app"),
        stringUtil = require("modules/api/utils/string_util"),
        logUtil = require("modules/api/utils/log_util"),
        template = require("text!templates/login/views/login.html");

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
            var that = this,
                username = this.ui.username.val(),
                password = this.ui.password.val();
            $.getJSON("assets/data/login.json")
                .done(function (data) {
                    var userInfo = data["user_info"];
                    if (!stringUtil.isBlank(username) && !stringUtil.isBlank(password) && username == userInfo.username && password == userInfo.password) {
                        that.ui.errorMessage.text("");
                        app.login.trigger("login:succeed", {
                            username: username,
                            position: "系统管理员",
                            permission: "全部"
                        });
                    } else {
                        that.ui.errorMessage.text("用户名或密码错误");
                        var errorMessageContainer = that.ui.errorMessage.parent().parent();
                        errorMessageContainer.fadeIn();
                    }
                })
                .fail(function (error) {
                    that.ui.errorMessage.text("获取用户信息失败");
                    logUtil.log(error.responseText);
                });
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