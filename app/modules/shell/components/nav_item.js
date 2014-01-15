define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        _ = require("underscore"),
        template = require("text!templates/shell/components/nav_item.html");

    var NavItem = Marionette.ItemView.extend({
        template: _.template(template),
        tagName: "li",
        events: {
            "click > a": "onLinkClick"
        },
        onLinkClick: function () {
            return !this.model.get("children");
        }
    });

    return NavItem;
});