define(function (require) {

    // load external dependencies
    var backbone = require("backbone"),
        _ = require("underscore");

    var NavItem = Backbone.Model.extend({
        defaults: {
            name: "",
            url: "",
            children: undefined
        },
        parse: function (response) {
            if (response && _.isArray(response.children)) {
                response.children = _.map(response.children, function (child) {
                    return new NavItem(child);
                });
            }
            return response;
        }
    });

    return NavItem;
});