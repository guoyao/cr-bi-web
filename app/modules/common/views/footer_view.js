define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/common/footer.html"),
        util = require("utils/util"),
        appInfo = require("app_info");

    var intervalId;

    var FooterView = Marionette.ItemView.extend({
        template: template,
        className: "footer",
        ui: {
            username: "#username",
            loginDuration: "#loginDuration"
        },
        onShow: function () {
            this.ui.username.text(appInfo.loginInfo.userInfo.toString());
            this.iePatch();
            this.startTrack();
        },
        startTrack: function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
            var loginTime = appInfo.loginInfo.loginDate.getTime(),
                view = this;
            intervalId = setInterval(function () {
                var timeDiff = new Date().getTime() - loginTime,
                    hours = Math.floor(timeDiff / util.dateTime.MILLSECONDS_OF_HOUR),
                    minutes = Math.floor((timeDiff - hours * util.dateTime.MILLSECONDS_OF_HOUR) / util.dateTime.MILLSECONDS_OF_MINUTE),
                    seconds = Math.floor((timeDiff - hours * util.dateTime.MILLSECONDS_OF_HOUR - minutes * util.dateTime.MILLSECONDS_OF_MINUTE) / util.dateTime.MILLSECONDS_OF_SECOND);
                view.ui.loginDuration.text(util.dateTime.toPretty(hours) + " : " + util.dateTime.toPretty(minutes) + " : " + util.dateTime.toPretty(seconds));
            }, util.dateTime.MILLSECONDS_OF_SECOND);
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