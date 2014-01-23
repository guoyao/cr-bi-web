define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/shell/views/footer.html"),
        dateTimeUtil = require("modules/api/utils/date_time_util"),
        appInfo = require("app_info");

    var intervalId;

    var FooterView = Marionette.ItemView.extend({
        template: template,
        className: "shell-footer",
        ui: {
            username: ".js-username",
            loginDuration: ".js-login-duration"
        },
        onShow: function () {
            this.ui.username.text(appInfo.loginInfo.userInfo.username);
            this.iePatch();
            this.startTrack();
        },
        onClose: function() {
            clearInterval(intervalId);
        },
        startTrack: function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
            var loginTime = appInfo.loginInfo.loginDate.getTime(),
                view = this;
            intervalId = setInterval(function () {
                var timeDiff = new Date().getTime() - loginTime,
                    hours = Math.floor(timeDiff / dateTimeUtil.MILLSECONDS_OF_HOUR),
                    minutes = Math.floor((timeDiff - hours * dateTimeUtil.MILLSECONDS_OF_HOUR) / dateTimeUtil.MILLSECONDS_OF_MINUTE),
                    seconds = Math.floor((timeDiff - hours * dateTimeUtil.MILLSECONDS_OF_HOUR - minutes * dateTimeUtil.MILLSECONDS_OF_MINUTE) / dateTimeUtil.MILLSECONDS_OF_SECOND);
                view.ui.loginDuration.text(dateTimeUtil.toPretty(hours) + " : " + dateTimeUtil.toPretty(minutes) + " : " + dateTimeUtil.toPretty(seconds));
            }, dateTimeUtil.MILLSECONDS_OF_SECOND);
        },
        iePatch: function () {
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
                this.$el.guiAffix({
                    offset: {
                        bottom: "1px"
                    }
                });
            }
        }
    });

    return FooterView;
});