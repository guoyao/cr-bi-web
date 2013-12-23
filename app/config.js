// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    baseUrl: "./",
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
