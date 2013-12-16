define(function (require) {
    "use strict";

    // load external dependencies
    var appInfo = require("app_info");

    return {
        routeChange: function (module, view) {
            module = appInfo.moduleMap[module];
            if (module && module != appInfo.moduleMap.login && module != appInfo.moduleMap.shell) {
                require([module.path], function (module) {
                    module.start();
                });
            }
        }
    };
});
