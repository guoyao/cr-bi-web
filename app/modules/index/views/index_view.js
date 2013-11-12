define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/index/index.html");

    var IndexView = Marionette.ItemView.extend({
        template: template
    });

    return IndexView;
});