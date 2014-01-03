define(function () {
    /**
     * @description 实现继承
     * @param {Function}/{Class} Child 子类
     * @param {Function}/{Class} Parent 父类，即被继承的类
     * */
    function inherits(Child, Parent) {
        var TempFunc = function () {};
        TempFunc.prototype = Parent.prototype;
        Child.prototype = new TempFunc();
        Child.prototype.constructor = Child;
        Child.uper = Parent.prototype;
    }
    return {
        inherits: inherits
    };
});