define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        _ = require("underscore"),
        gui = require("gui"),
        appInfo = require("app_info"),
        template = require("text!templates/shell/components/nav.html"),
        NavItem = require("modules/shell/components/nav_item"),
        NavItemCollection = require("modules/shell/collections/nav_item_collection");

    var Nav = Marionette.CompositeView.extend({
        template: template,
        itemView: NavItem,
        itemViewContainer: '.gui-nav',
        className: "grid-medium",
        ui: {
          menu: ".gui-nav"
        },
        initialize: function () {
            this.collection = new NavItemCollection();
            this.collection.on("reset", function () {
                if (this.ui) {
                    iePatch.call(this);
                }
            }, this);
            this.doSwitch();
        },
        onShow: function () {
            if (!iePatch.call(this)) {
                this.ui.menu.guiNav();
            }
        },
        doSwitch: function () {
            var category = appInfo.isInAdminSection ? NavItemCollection.category.admin : NavItemCollection.category.user;
            if (category != this.collection.category) {
                this.collection.category = category;
                this.collection.fetch({reset: true});
            }
        }
    });

    function iePatch() {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
            var that = this;
            _.defer(function () {
                that.ui.menu.guiNav();
            });
            return true;
        }
        return false;
    }

    return Nav;
});