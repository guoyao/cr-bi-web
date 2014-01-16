define(function (require) {

    // load external dependencies
    var backbone = require("backbone"),
        _ = require("underscore");

    var NavItem = Backbone.Model.extend({
        defaults: {
            name: "",
            url: "",
            children: undefined
        }
    });

    return NavItem;
});