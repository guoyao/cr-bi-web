define(function (require) {

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/shell/shell.html"),
        HeaderView = require("modules/shell/views/header_view"),
        FooterView = require("modules/shell/views/footer_view"),
        GlobalQueryPanel = require("modules/shell/components/global_query_panel");

    var ShellView = Marionette.Layout.extend({
        template: template,
        ui: {
            header: "#header",
            globalQueryContainer: "#globalQueryContainer",
            datePicker: ".date-picker"
        },
        regions: {
            headerRegion: "#header",
            mainRegion: "#main",
            globalQueryRegion: "#globalQueryContainer",
            moduleRegion: "#moduleContainer",
            footerRegion: "#footer"
        },
        onShow: function () {
            this.headerRegion.show(new HeaderView());
            this.footerRegion.show(new FooterView());
            this.globalQueryRegion.show(new GlobalQueryPanel());
            this.trigger("shown");
//            this.ui.datePicker.guiDatePicker();
            iePatch.call(this);
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