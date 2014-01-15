define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        NavItemModel = require("modules/shell/models/nav_item");

    var NavItemCollection = Backbone.Collection.extend({
        model: NavItemModel,
        url: 'assets/data/nav_item_collection.json'
    });

    return NavItemCollection;
});