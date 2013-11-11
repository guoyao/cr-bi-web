define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        _ = require("underscore"),
        template = require("text!templates/common/nav_item.html");

    var NavItemView = Marionette.ItemView.extend({
        template: _.template(template),
        tagName: "li"
    });

    return NavItemView;
});