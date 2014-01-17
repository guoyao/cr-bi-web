define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/admin/views/user_action_log.html");

    var artifact = "userActionLog";

    var UserActionLogView = Marionette.ItemView.extend({
        artifact: artifact,
        template: template,
        id: artifact + "View"
    });

    return UserActionLogView;
});