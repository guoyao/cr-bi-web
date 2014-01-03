define(function () {
    return (function (window) {
        function forward() {
            window.history.forward();
        }

        function back() {
            window.history.back();
        }

        return {
            forward: forward,
            back: back
        };
    })(window);
});