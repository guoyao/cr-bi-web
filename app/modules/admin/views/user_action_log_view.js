define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/admin/views/user_action_log.html");

    var UserActionLogView = Marionette.ItemView.extend({
        artifact: "userActionLog",
        template: template
    });

    return UserActionLogView;
});