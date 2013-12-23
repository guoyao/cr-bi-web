// merge dependencies to single file
require(["config"], function () {
    require([
        "text",
        "json2",
        "numeral",
        "underscore",
        "jquery",
        "backbone",
        "marionette",
        "gui",
        "jquery.cookie",
        "jquery.dateFormat",
        "app_info",
        "utils/util",
        "app"
    ], function () {
        "use strict";

        var $ = require("jquery"),
            app = require("app");

        // configurations
        $.cookie.json = true;

        app.start();
    });
});
