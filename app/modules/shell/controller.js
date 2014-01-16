define(function (require) {
    "use strict";

    // load external dependencies
    var app = require("app"),
        appInfo = require("app_info");

    return {
        routeChange: function (module, view) {
            appInfo.isInAdminSection = module == appInfo.moduleMap.admin.name;
            module = appInfo.moduleMap[module];
            if (!module) {
                module = appInfo.defaultModule;
                app.navigate(module.hash, {trigger: false});
            }
            if (module != appInfo.moduleMap.login && module != appInfo.moduleMap.shell) {
                require([module.path], function (module) {
                    if (app.currentModule != module) {
                        if (app.currentModule) {
                            app.currentModule.stop();
                        }
                        app.currentModule = module;
                        module.start({view: view});
                    } else if (module.navigate) {
                        module.navigate({view: view});
                    }
                });
            }
        }
    };
});
