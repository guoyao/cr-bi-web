(function () {
    "use strict";

    var preloaderTextElement = document.getElementById("preloaderText");

    function isFunction(value) {
        return Object.prototype.toString.call(value) === "[object Function]";
    }

    function Preloader(packages, options) {
        this.packages = packages;
        this.options = options;
        this.currentLoadingPackageIndex = 0;
        this.totalPackage = (packages ? packages.length : 0) || 0;
        this.progressProvided = options && isFunction(options.progress);
        this.completeProvided = options && isFunction(options.complete);
    }

    Preloader.prototype.load = function () {
        if (this.currentLoadingPackageIndex < this.totalPackage) {
            var that = this;
            require([this.packages[this.currentLoadingPackageIndex].artifact], function () {
                if (that.progressProvided) {
                    that.options.progress.call(that);
                }
                if (that.currentLoadingPackageIndex === that.totalPackage - 1 && that.completeProvided) {
                    that.options.complete.call(that);
                }
                that.currentLoadingPackageIndex++;
                that.load();
            });
        }
    };

    new Preloader([
        {artifact: "config", description: "系统配置文件"},
        {artifact: "text", description: "系统依赖"},
        {artifact: "json2", description: "系统依赖"},
        {artifact: "numeral", description: "系统依赖"},
        {artifact: "underscore", description: "系统依赖"},
        {artifact: "jquery", description: "系统依赖"},
        {artifact: "backbone", description: "系统依赖"},
        {artifact: "marionette", description: "系统依赖"},
        {artifact: "gui", description: "系统依赖"},
        {artifact: "jquery.cookie", description: "系统依赖"},
        {artifact: "jquery.dateFormat", description: "系统依赖"},
        {artifact: "highcharts", description: "系统依赖"},
        {artifact: "flexigrid", description: "系统依赖"},
        {artifact: "modules/api/utils/string_util", description: "系统启动程序"},
        {artifact: "modules/api/utils/storage_util", description: "系统启动程序"},
        {artifact: "modules/api/utils/log_util", description: "系统启动程序"},
        {artifact: "app_info", description: "系统启动程序"},
        {artifact: "app", description: "系统启动程序"},
    ], {
        progress: function () {
            var percentString = parseInt((this.currentLoadingPackageIndex + 1) / this.totalPackage * 100, 10) + "%";
            preloaderTextElement.innerHTML = "正在加载" + this.packages[this.currentLoadingPackageIndex].description + ": " + percentString;
        },
        complete: complete
    })
        .load();

    function complete() {
        // merge dependencies to single file

        var $ = require("jquery"),
            app = require("app"),
            appInfo = require("app_info"),
            stringUtil = require("modules/api/utils/string_util");

        // ----------[start]--------- global configurations for jquery and it's plugins -------------
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (settings.url && !stringUtil.isAbsoluteURI(settings.url)) {
                    settings.url = appInfo.properties.serviceRoot + settings.url;
                }
            }
        });

        $.cookie.json = true;

        Highcharts.setOptions({
            colors: ["#2f7ed8", "#8bbc21", "#f28f43", "#77a1e5", "#cc0000", "#0d233a", "#1aadce", "#492970", "#c42525", "#a6c96a"]
        });
        // ----------[end]--------- global configurations for jquery and it's plugins -------------


        // ----------[start]--------- some small jquery plugins -------------
        //  small jquery plugin for getting pixels from css property
        if (!$.fn.pixels) {
            $.fn.pixels = function (property) {
                return parseInt(this.css(property).slice(0, -2), 10);
            };
        }
        // ----------[end]--------- some small jquery plugins -------------

        app.start();
    }
})();