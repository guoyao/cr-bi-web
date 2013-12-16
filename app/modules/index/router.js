define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        app_info = require("app_info");

    var Router = Marionette.AppRouter.extend((function () {
        var routes = {};
        routes[app_info.moduleMap.index.hash + "/:view"] = "routeChange";
        return {
            appRoutes: routes
        }
    })());

    return Router;
});