define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/common/header.html"),
        util = require("utils/util"),
        NavView = require("modules/common/views/nav_view");

    var HeaderView = Marionette.Layout.extend({
        template: template,
        className: "header",
        events: {
            "click #logoutBtn": "logout"
        },
        regions: {
            nav: "#nav"
        },
        onShow: function () {
            this.iePatch();
            this.nav.show(new NavView());
        },
        logout: function () {
            util.app.logout();
        },
        iePatch: function () {
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
                this.$el.guiAffix({ offset: 0 });
            }
        }
    });

    return HeaderView;
});