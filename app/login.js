//require.config({
//    urlArgs: "version=" + new Date().getTime()
//});
require(["common"], function () {
    "use strict";

    require([
        "modules/login/router",
        "modules/login/controller",
        "modules/login/views/main"
    ], function (Router, Controller, LoginMainView) {
        // load external dependencies
        var app = require("app");

        new Router({controller: Controller});

        app.addInitializer(function () {
            app.main.show(new LoginMainView());
        });

        app.start();
    });

});