define(function (require) {
    "use strict";

    // load external dependencies
    var Marionette = require("marionette"),
        template = require("text!templates/sale/views/profit_analysis.html");

    var artifact = "profit";

    var ProfitAnalysisView = Marionette.ItemView.extend({
        artifact: artifact,
        template: template,
        id: artifact + "View"
    });

    return ProfitAnalysisView;
});