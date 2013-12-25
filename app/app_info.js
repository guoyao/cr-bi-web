define(function (require) {
    // load external dependencies
    var util = require("utils/util");

    var loginCookieKey = "loginInfo",
        properties = {
            imageRoot: "assets/images/",
            weatherServiceURL: "http://localhost:3000/weatherInfo"
        };

    function ModuleDescriptor(name, artifact, path, hash, description) {
        this.name = name;
        this.artifact = artifact;
        this.path = path;
        this.hash = hash;
        this.description = description;
    }

    var moduleMap = {
        login: new ModuleDescriptor("login", "login", "modules/login/login", "login", "登陆页面"),
        shell: new ModuleDescriptor("shell", "shell", "modules/shell/shell", "", "所有模块的容器"),
        index: new ModuleDescriptor("index", "shell.index", "modules/index/index", "index", "首页"),
        sale: new ModuleDescriptor("sale", "shell.sale", "modules/sale/sale", "sale", "销售分析")
    };

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
        isLogin: isLogin,
        moduleMap: moduleMap,
        defaultModule: moduleMap.index,
        properties: properties
    };
});