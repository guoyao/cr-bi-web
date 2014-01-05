define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class");

    var Chart = new Class({
        initialize: function ($element, dataProvider, options, globalOptions) {
            this.$element = $element;
            this.options = _.extend({}, globalOptions, this.constructor.defaultOptions, options);
            this.setDataProvider(dataProvider);
        },
        setDataProvider: function (dataProvider) {
            this._dataProvider = dataProvider;
            return this;
        },
        getDataProvider: function () {
            return this._dataProvider;
        },
        render: function () {
            this.$element.highcharts(this.options);
            return this;
        }
    });

    Chart.defaultOptions = {};

    return Chart;
});