define(function (require) {
    // load external dependencies
    var gui = require("gui");

    var console = window.console,
        isIE = gui.browserInfo.isIE,
        version = gui.browserInfo.version;

    function log(value) {
        if (isIE && version < 9) {
            return;
        }
        console.log(value);
    }

    function debug(value) {
        console.debug(value);
    }

    return {
        log: log,
        debug: debug
    };
});