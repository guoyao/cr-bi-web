define(function () {

    function ModuleDescriptor(artifact, url, description) {
        this.artifact = artifact;
        this.url = url;
        this.description = description;
    }

    var moduleMap = {
        index: new ModuleDescriptor("index", "/", "首页"),
        login: new ModuleDescriptor("login", "login.html", "登陆页面")
    };

    var modules = (function () {
        var result = [];
        for (var key in moduleMap) {
            result.push(moduleMap[key]);
        }
        return result;
    })();

    function LoginInfo(userInfo, loginDate) {
        this.userInfo = userInfo;
        this.loginDate = loginDate;
    }

    LoginInfo.prototype.update = function (loginInfo) {
        this.userInfo = loginInfo.userInfo;
        this.loginDate = (loginInfo.loginDate instanceof Date) ? loginInfo.loginDate : new Date(loginInfo.loginDate);
    };

    return {
        loginCookieKey: "loginInfo",
        module: moduleMap,
        modules: modules,
        loginInfo: new LoginInfo(null, null) // instance of LoginInfo and will be update before app initialize
    };

});