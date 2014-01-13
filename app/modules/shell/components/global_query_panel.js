define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        gui = require("gui"),
        template = require("text!templates/shell/components/global_query_panel.html");

    var GlobalQueryPanel = Marionette.ItemView.extend({
        template: template,
        id: "globalQueryPanel",
        className:"gui-panel gui-panel-default",
        onRender: function () {
            iePatch.call(this);
            this.$el.find(".gui-btn-bar").guiButtonBar({
                selectedIndex: 0
            });
        }
    });

    function iePatch() {
        if (gui.browserInfo.isIE) {
            if (gui.browserInfo.version <= 9) {
                this.$el.find(".gui-btn").guiButton();
            }
            if (gui.browserInfo.version <= 6) {
                this.$el.find("> .gui-panel-heading").addClass("global-query-panel-heading");
                this.$el.find(".gui-panel:last-child").css("border-bottom", 0);
                this.$el.find("> .gui-panel-body").css("padding", 0);
                this.$el.find("td:first-child").css("padding-right", 6);
            }
        }
    }

    return GlobalQueryPanel;
});