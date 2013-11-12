// merge dependencies to single file
define(function (require) {
    "use strict";

    // load external lib dependencies.
    require("text");
    var $ = require("jquery");
    require("json2");
    require("underscore");
    require("backbone");
    require("marionette");
    require("gui");
    require("jquery.cookie");
    require("jquery.dateFormat");

    // load application common dependencies
    require("config");
    require("app");
    require("app_info");
    require("utils/util");

    // configurations
    $.cookie.json = true;
});