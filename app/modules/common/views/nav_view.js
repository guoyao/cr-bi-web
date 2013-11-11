define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        _ = require("underscore"),
        gui = require("gui"),
        template = require("text!templates/common/nav.html"),
        NavItemView = require("modules/common/views/nav_item_view"),
        NavItemCollection = require("modules/common/collections/nav_item_collection");

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
            if (!this.iePatch()) {
                this.ui.menu.guiNav();
            }
        },
        iePatch: function () {
            if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
                var view = this;
                _.defer(function () {
                    view.ui.menu.guiNav();
                });
                return true;
            }
            return false;
        }
    });

    return NavView;
});