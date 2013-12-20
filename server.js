/**
 * Author: guoyao
 * Time: 10-22-2013 18:26
 * Blog: http://www.guoyao.me
 */

var application_root = __dirname,
    http = require('http'),
    express = require('express'),
    path = require('path'),
    xml2js = require("xml2js"),
    app = express(),
    port = 3000;

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, 'dist')));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

app.get('/weatherInfo', function (request, response) {
    http.get('http://www.webxml.com.cn/WebServices/WeatherWebService.asmx/getWeatherbyCityName?theCityName=58457').on('response', function (res) {
        var body = '',
            query = request.query;
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (query && query.callback) {
                var parseString = xml2js.parseString,
                    weatherInfo = {};
                parseString(body, function (err, result) {
                    if (!err) {
                        weatherInfo = result.ArrayOfString.string;
                    }
                });
                response.setHeader("Content-Type", "text/javascript");
                response.send(query.callback + "(" + JSON.stringify(weatherInfo) + ")");
            } else {
                response.send(body);
            }
        });
    });
});
