define(function (require) {
    // load external dependencies
    var _ = require("underscore");

    var Chart = function ($element, dataProvider, options, globalOptions) {
        this.$element = $element;
        this.options = _.extend({}, globalOptions, this.constructor.defaultOptions, options);
        this.setDataProvider(dataProvider);
    };

    Chart.defaultOptions = {};

    Chart.prototype.setDataProvider = function (dataProvider) {
        this._dataProvider = dataProvider;
        return this;
    };

    Chart.prototype.getDataProvider = function () {
        return this._dataProvider;
    };

    Chart.prototype.render = function () {
        this.$element.highcharts(this.options);
        return this;
    };

    return Chart;
});