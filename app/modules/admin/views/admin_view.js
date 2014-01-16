define(function (require) {

    // load external dependencies
    var Marionette = require("marionette"),
        appInfo = require("app_info"),
        template = require("text!templates/admin/views/admin.html"),
        IndexView = require("modules/admin/views/index_view"),
        UserActionLogView = require("modules/admin/views/user_action_log_view");

    var viewMap = {
            index: IndexView,
            userActionLog: UserActionLogView
        },
        defaultView = viewMap.index;

    var AdminView = Marionette.Layout.extend({
        template: template,
        disableGlobalQuery: true,
        id: appInfo.moduleMap.admin.name + "Module",
        regions: {
            bodyRegion: ".view-container"
        },
        onShow: function () {
            this.navigate(this.options);
        },
        navigate: function (options) {
            var ViewClass = defaultView;
            if (options) {
                ViewClass = viewMap[options.view] || ViewClass;
            }
            this.view = new ViewClass();
            this.bodyRegion.show(this.view);
            this.trigger("shown");
        }
    });

    return AdminView;
});