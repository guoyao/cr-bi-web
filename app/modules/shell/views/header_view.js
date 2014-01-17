define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        app = require("app"),
        appInfo = require("app_info"),
        template = require("text!templates/shell/views/header.html"),
        Nav = require("modules/shell/components/nav"),
        NavItemCollection = require("modules/shell/collections/nav_item_collection");

    var HeaderView = Marionette.Layout.extend({
        template: template,
        className: "header",
        ui: {
            switchToAdminButton: "#switchToAdminBtn",
            switchToUserButton: "#switchToUserBtn",
            buttons: ".gui-btn"
        },
        events: {
            "click #switchToAdminBtn": "switchToAdminOrUser",
            "click #switchToUserBtn": "switchToAdminOrUser",
            "click #logoutBtn": "logout"
        },
        regions: {
            navRegion: "#nav"
        },
        onShow: function () {
            this.nav = new Nav();
            this.navRegion.show(this.nav);
            iePatch.call(this);
        },
        switchToAdminOrUser: function (e) {
            if (e.target === this.ui.switchToAdminButton[0]) {
                this.ui.switchToAdminButton.hide();
                this.ui.switchToUserButton.show();
                appInfo.isInAdminSection = true;
                this.nav.doSwitch();
                app.navigate(appInfo.moduleMap.admin.hash);
            } else {
                this.ui.switchToAdminButton.show();
                this.ui.switchToUserButton.hide();
                appInfo.isInAdminSection = false;
                this.nav.doSwitch();
                app.navigate(appInfo.moduleMap.index.hash);
            }
        },
        switchNav: function () {
            if (appInfo.isInAdminSection) {
                this.ui.switchToAdminButton.hide();
                this.ui.switchToUserButton.show();
            } else {
                this.ui.switchToAdminButton.show();
                this.ui.switchToUserButton.hide();
            }
            this.nav.doSwitch();
        },
        logout: function () {
            app.shell.trigger("logout");
        }
    });

    function iePatch() {
        if (gui.browserInfo.isIE) {
            if (gui.browserInfo.version <= 9) {
                this.ui.buttons.guiButton();
            }
            if (gui.browserInfo.version < 9) {
                this.ui.switchToAdminButton.css("margin-right", 5);
                this.ui.switchToUserButton.css("margin-right", 5);
            }
            if (gui.browserInfo.version <= 6) {
                this.$el.guiAffix({ offset: 0 });
            }
        }
    }

    return HeaderView;
});