define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        app = require("app"),
        template = require("text!templates/shell/views/header.html"),
        Nav = require("modules/shell/components/nav");

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
            this.nav.show(new Nav());
            iePatch.call(this);
        },
        logout: function () {
            app.shell.trigger("logout");
        }
    });

    function iePatch() {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
            this.$el.guiAffix({ offset: 0 });
        }
    }

    return HeaderView;
});