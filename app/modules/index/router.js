define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette");

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "*path": "index"
        }
    });

    return Router;
});