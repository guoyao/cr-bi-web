define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/index/main.html");

    var Main = Marionette.ItemView.extend({
        template: template
    });

    return Main;
});