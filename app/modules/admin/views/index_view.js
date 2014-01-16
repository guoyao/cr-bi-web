define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/admin/views/index.html");

    var IndexView = Marionette.ItemView.extend({
        artifact: "index",
        template: template
    });

    return IndexView;
});