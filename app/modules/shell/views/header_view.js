define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        app = require("app"),
        template = require("text!templates/shell/header.html"),
        NavView = require("modules/shell/views/nav_view");

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
            app.shell.trigger("logout");
        },
        iePatch: function () {
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
                this.$el.guiAffix({ offset: 0 });
            }
        }
    });

    return HeaderView;
});