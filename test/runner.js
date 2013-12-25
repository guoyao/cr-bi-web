(function (window) {
    "use strict";

    var karma = window.__karma__;

    karma.options = {
        asyncWaitTime: 500
    };

    // Put Karma into an asynchronous waiting mode until we have loaded our
    // tests.
    karma.loaded = function () {};

   if (window.chai) {
        // Optionally use chai with Mocha.
        window.expect = window.chai.expect;
    }

    // Set the application endpoint and load the configuration.
    require.config({
        baseUrl: "base/app",
        paths: {
            // Map dependencies.
            text: "libs/text",
            json2: "libs/json2",
            jquery: "libs/jquery",
            underscore: "libs/underscore", // Opt for Lo-Dash Underscore compatibility build over Underscore.
            backbone: "libs/backbone",
            marionette: "libs/backbone.marionette",
            gui: "libs/gui",
            "jquery.cookie": "libs/jquery.cookie",
            "jquery.dateFormat": "libs/jquery.dateFormat",
            "numeral": "libs/numeral"
        },
        shim: {
            underscore: {
                exports : "_"
            },
            // This is required to ensure Backbone works as expected within the AMD environment.
            backbone: {
                // These are the two hard dependencies that will be loaded first.
                deps: ["jquery", "underscore"],

                // This maps the global `Backbone` object to `require("backbone")`.
                exports: "Backbone"
            },
            marionette: {
                // These are hard dependencies that will be loaded first.
                deps : ["jquery", "underscore", "backbone"],
                exports : "Marionette"
            },
            json2: {
                exports: "json2"
            },
            gui: {
                deps : ["jquery"],
                exports : "gui"
            },
            "jquery.cookie": {
                deps : ["jquery"]
            },
            "jquery.dateFormat": {
                deps : ["jquery"]
            }
        }
    });

    require([
        "text",
        "json2",
        "numeral",
        "underscore",
        "jquery",
        "backbone",
        "marionette",
        "gui",
        "jquery.cookie",
        "jquery.dateFormat",
        "app_info",
        "utils/util",
        "app"
    ], function () {
        // load external dependencies
        var $ = require("jquery"),
            _ = require("underscore"),
            app = require("app");

        // configurations
        $.cookie.json = true;

        var specs = _.chain(karma.files)
            // Convert the files object to an array of file paths.
            .map(function (id, file) {
                return file;
            })
            // Tests that end with `.spec.js' and existing either `app` or `test`
            // directories are automatically loaded.
            .filter(function (file) {
                return /^\/base\/(app|test)\/.*\.spec\.js$/.test(file);
            })
            .value();

        // Load all specs and start Karma.
        require(specs, function () {
            karma.start();
            app.start();
        });
    });
})(this);
