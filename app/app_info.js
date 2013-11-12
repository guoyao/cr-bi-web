define(function (require) {
    // load external dependencies
    var util = require("utils/util");

    var loginCookieKey = "loginInfo";

    function isLogin() {
        return !!util.storage.get(loginCookieKey);
    }

    function LoginInfo(userInfo, loginDate) {
        this.userInfo = userInfo;
        this.loginDate = loginDate;
    }

    LoginInfo.prototype.update = function (loginInfo) {
        loginInfo = loginInfo || util.storage.get(loginCookieKey);
        this.userInfo = loginInfo.userInfo;
        this.loginDate = (loginInfo.loginDate instanceof Date) ? loginInfo.loginDate : new Date(loginInfo.loginDate);
    };

    return {
        loginCookieKey: loginCookieKey,
        loginInfo: new LoginInfo(null, null), // instance of LoginInfo and will be update before app initialize
        isLogin: isLogin
    };
});