define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        NavItemModel = require("modules/shell/models/nav_item");

    var NavItemCollection = Backbone.Collection.extend({
        model: NavItemModel,
        url: 'assets/data/nav_item_collection.json',
        parse: function (response) {
            return response[this.category || NavItemCollection.category.user];
        }
    });

    NavItemCollection.category = {
        user: "user_section",
        admin: "admin_section"
    };

    return NavItemCollection;
});