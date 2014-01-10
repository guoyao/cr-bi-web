define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        _ = require("underscore"),
        gui = require("gui"),
        template = require("text!templates/shell/nav.html"),
        NavItemView = require("modules/shell/views/nav_item_view"),
        NavItemCollection = require("modules/shell/collections/nav_item_collection");

    var NavView = Marionette.CompositeView.extend({
        template: template,
        itemView: NavItemView,
        itemViewContainer: '.gui-nav',
        className: "grid-medium",
        ui: {
          menu: ".gui-nav"
        },
        initialize: function () {
            this.collection = new NavItemCollection();
            this.collection.fetch();
        },
        onShow: function () {
            if (!iePatch.call(this)) {
                this.ui.menu.guiNav();
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

    return NavView;
});