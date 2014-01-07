(function (window) {
    "use strict";

    var karma = window.__karma__;

    karma.options = {
        asyncWaitTime: 1000
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
            numeral: "libs/numeral",
            highcharts: "libs/highcharts",
            flexigrid: "libs/flexigrid"
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
            },
            highcharts: {
                deps : ["jquery"]
            },
            flexigrid: {
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
        "highcharts",
        "flexigrid",
        "modules/api/utils/string_util",
        "modules/api/utils/storage_util",
        "app_info",
        "app"
    ], function () {
        // load external dependencies
        var $ = require("jquery"),
            _ = require("underscore"),
            app = require("app"),
            appInfo = require("app_info"),
            stringUtil = require("modules/api/utils/string_util");

        appInfo.properties.serviceRoot = "base/app/";

        // ----------[start]--------- global configurations for jquery and it's plugins -------------
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (settings.url && !stringUtil.isAbsoluteURI(settings.url)) {
                    settings.url = appInfo.properties.serviceRoot + settings.url;
                }
            }
        });

        $.cookie.json = true;

        Highcharts.setOptions({
            colors: ["#2f7ed8", "#8bbc21", "#f28f43", "#77a1e5", "#cc0000", "#0d233a", "#1aadce", "#492970", "#c42525", "#a6c96a"]
        });
        // ----------[end]--------- global configurations for jquery and it's plugins -------------


        // ----------[start]--------- some small jquery plugins -------------
        //  small jquery plugin for getting pixels from css property
        if (!$.fn.pixels) {
            $.fn.pixels = function (property) {
                return parseInt(this.css(property).slice(0, -2), 10);
            };
        }
        // ----------[end]--------- some small jquery plugins -------------

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

        // Load all specs then start Karma and app
        require(specs, function () {
            karma.start();
            app.start();
        });
    });
})(this);
