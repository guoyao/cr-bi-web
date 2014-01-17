define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class");

    var DataGrid = new Class({
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
            this.$element.flexigrid(this.options);
            if (this._dataProvider) {
                this.$element.flexAddData(this._dataProvider);
            }
            return this;
        }
    });

    DataGrid.defaultOptions = {};

    return DataGrid;
});