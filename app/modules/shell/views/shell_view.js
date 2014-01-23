define(function (require) {

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/shell/views/shell.html"),
        HeaderView = require("modules/shell/views/header_view"),
        FooterView = require("modules/shell/views/footer_view"),
        GlobalQueryPanel = require("modules/shell/components/global_query_panel");

    var ShellView = Marionette.Layout.extend({
        template: template,
        ui: {
            globalQueryContainer: "#globalQueryContainer",
            datePicker: ".date-picker"
        },
        regions: {
            headerRegion: ".js-header",
            globalQueryRegion: "#globalQueryContainer",
            moduleRegion: "#moduleContainer",
            footerRegion: ".js-footer"
        },
        onShow: function () {
            this.headerView = new HeaderView();
            this.headerRegion.show(this.headerView);
            this.footerRegion.show(new FooterView());
            this.globalQueryRegion.show(new GlobalQueryPanel());
            this.trigger("shown");
//            this.ui.datePicker.guiDatePicker();
            iePatch.call(this);
        },
        switchNav: function () {
            this.headerView.switchNav();
        }
    });

    function iePatch() {
        if (gui.browserInfo.isIE && gui.browserInfo.version <= 6) {
            this.ui.globalQueryContainer.guiAffix({
                offset: {
                    top: 119,
                    left: "10px"
                }
            });
        }
    }

    return ShellView;
});