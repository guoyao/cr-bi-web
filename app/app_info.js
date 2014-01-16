define(function (require) {
    // load external dependencies
    var storageUtil = require("modules/api/utils/storage_util");

    var loginCookieKey = "loginInfo",
        properties = {
            serviceRoot: "",
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
        api: new ModuleDescriptor("api", "api", "modules/api/api", "", "类RSL(Runtime Shared Library)模块"),
        login: new ModuleDescriptor("login", "login", "modules/login/login", "login", "登陆页面"),
        shell: new ModuleDescriptor("shell", "shell", "modules/shell/shell", "", "所有模块的容器"),
        index: new ModuleDescriptor("index", "shell.index", "modules/index/index", "index", "首页"),
        sale: new ModuleDescriptor("sale", "shell.sale", "modules/sale/sale", "sale", "销售分析"),
        admin: new ModuleDescriptor("admin", "shell.admin", "modules/admin/admin", "admin", "后台管理")
    };

    function isLogin() {
        return !!storageUtil.get(loginCookieKey);
    }

    function LoginInfo(userInfo, loginDate) {
        this.userInfo = userInfo;
        this.loginDate = loginDate;
    }

    LoginInfo.prototype.update = function (loginInfo) {
        loginInfo = loginInfo || storageUtil.get(loginCookieKey);
        this.userInfo = loginInfo.userInfo;
        this.loginDate = (loginInfo.loginDate instanceof Date) ? loginInfo.loginDate : new Date(loginInfo.loginDate);
    };

    return {
        loginCookieKey: loginCookieKey,
        loginInfo: new LoginInfo(null, null), // instance of LoginInfo and will be update before app initialize
        isLogin: isLogin,
        moduleMap: moduleMap,
        defaultModule: moduleMap.index,
        properties: properties,
        isInAdminSection: false
    };
});