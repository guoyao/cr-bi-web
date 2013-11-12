define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        NavItem = require("modules/shell/models/nav_item");

    var NavItemCollection = Backbone.Collection.extend({
        model: NavItem,
        url: 'assets/data/nav_item_collection.json'
    });

    return NavItemCollection;
});