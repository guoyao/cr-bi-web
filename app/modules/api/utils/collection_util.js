define(function () {
    function isArray(value) {
        return value && Object.prototype.toString.call(value) === "[object Array]";
    }

    return {
        isArray: isArray
    };
});