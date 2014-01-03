define(function (require) {
    // load external dependencies
    var $ = require("jquery");

    function isBlank(value) {
        return $.trim(value).length === 0;
    }

    function substitute(value) {
        if (value) {
            var args = arguments,
                pattern = new RegExp("{([0-" + (arguments.length - 2) + "])}", "g");

            return value.replace(pattern, function (match, index) {
                return  args[parseInt(index, 10) + 1];
            });
        }

        return value;
    }

    /**
     * @description 字符串是否属于绝对URI
     * @param {String} URI 字符串
     * @returns {boolean} 是否是绝对的
     */
    function isAbsoluteURI(URI) {
        return URI.search(/^[^:]+:\/\//) === 0;
    }

    return {
        isBlank: isBlank,
        substitute: substitute,
        isAbsoluteURI: isAbsoluteURI
    };
});