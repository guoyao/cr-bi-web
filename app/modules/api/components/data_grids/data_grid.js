define(function (require) {
    // load external dependencies
    var _ = require("underscore"),
        Class = require("modules/api/core/class");

    var DataGrid = new Class({
        initialize: function ($element, data, options, globalOptions) {
            this.$element = $element;
            this.options = _.extend({}, globalOptions, this.constructor.defaultOptions, options);
            this.setData(data);
        },
        setData: function (data) {
            this._data = data;
            if (data && _.isArray(this.options.colModel) && _.isArray(data.datum)) {
                var rowItem;
                data.rows = [];
                _.each(data.datum, function (item) {
                    rowItem = {cell: []};
                    _.each(this.options.colModel, function (column) {
                        if (column.dataField) {
                            rowItem.cell.push(item[column.dataField]);
                        }
                    });
                    data.rows.push(rowItem);
                }, this);
            }
            return this;
        },
        getData: function () {
            return this._data;
        },
        render: function () {
            this.$element.flexigrid(this.options);
            if (this._data) {
                this.$element.flexAddData(this._data);
            }
            return this;
        }
    });

    DataGrid.defaultOptions = {
        dataType: 'json',
        resizable: false
    };

    return DataGrid;
});