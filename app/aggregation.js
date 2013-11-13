// merge dependencies to single file
require([
    "text",
    "json2",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "gui",
    "jquery.cookie",
    "jquery.dateFormat",
    "config",
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