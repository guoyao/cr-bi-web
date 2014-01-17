define(function (require) {
    "use strict";

    // load external dependencies
    var $ = require("jquery"),
        Marionette = require("marionette"),
        DataGrid = require("modules/api/components/data_grids/data_grid"),
        template = require("text!templates/admin/views/user_action_log.html");

    var artifact = "userActionLog";

    var UserActionLogView = Marionette.ItemView.extend({
        artifact: artifact,
        template: template,
        id: artifact + "View",
        ui: {
            userActionLogTable: "#userActionLogTable"
        },
        onShow: function () {
            var that = this;
            $.getJSON("assets/data/admin.json")
                .done(function (data) {
                    var userActionLogData = data["user_action_log"];
                    showUserActionLogTable.call(that, userActionLogData["user_action_log_table_datum"]);
                });
        }
    });

    function showUserActionLogTable(data) {
        new DataGrid(this.ui.userActionLogTable, data, {
            height: 500,
            colModel: [
                { display: '用户名称', name: 'username', dataField: "username", sortable: true, width: 120},
                { display: '角色', name: 'role', dataField: "role", sortable: true, width: 150},
                { display: '菜单', name: 'menu', dataField: "menu", sortable: true, width: 200},
                { display: '访问时间', name: 'access_time', dataField: "access_time", sortable: true, width: 120, align: "center"}
            ]
        }).render();
    }

    return UserActionLogView;
});