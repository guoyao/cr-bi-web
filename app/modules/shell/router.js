define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        app_info = require("app_info");

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "*module(/:view)": "routeChange"
        }
    });

    return Router;
});