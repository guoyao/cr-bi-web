define(function (require) {
    // load external dependencies
    var gui = require("gui"),
        app = require("app"),
        appInfo = require("app_info");

    var location = window.location,
        locationHash = location.hash,
        intervalId;

    function start() {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 7) {
            if (!intervalId) {
                intervalId = setInterval(function () {
                    if (locationHash != location.hash) {
                        locationHash = location.hash;
                        navigate(locationHash);
                    }
                }, 1000);
            }
        }
    }

    function navigate(fragment) {
        var matches = fragment.match(/#([^\/]+)\/?([^\/]*)/),
            module,
            view;
        if (matches) {
            module = matches[1];
            view = matches[2];
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
    }

    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    }

    return {
        start: start,
        stop: stop,
        navigate: navigate
    };
});