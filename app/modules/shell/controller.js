define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info");

    return {
        routeChange: function (module, view) {
            module = appInfo.moduleMap[module];
            if (module && module != appInfo.moduleMap.login && module != appInfo.moduleMap.shell) {
                require([module.path], function (module) {
                    if (app.currentModule != module) {
                        if (app.currentModule) {
                            app.currentModule.stop();
                        }
                        app.currentModule = module;
                        module.start();
                    }
                });
            }
        }
    };
});
