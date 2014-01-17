define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/admin/views/index.html");

    var artifact = "index";

    var IndexView = Marionette.ItemView.extend({
        artifact: artifact,
        template: template,
        id: artifact + "AdminView"
    });

    return IndexView;
});