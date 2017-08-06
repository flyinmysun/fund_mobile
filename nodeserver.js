/**
 * Created by zhanwenwei on 2017/3/21.
 */
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '')));

console.log(__dirname);

app.get('/', function (req, res) {
    var indexPath = path.join(__dirname,'js.test/test/test11shopping.html')
    res.sendFile(indexPath);
})

app.get('/send', function (req, res) {
    var indexPath = path.join(__dirname,'js.test/test/test9send.html')
    res.sendFile(indexPath);
})

app.get('/mobile1', function (req, res) {
    var indexPath = path.join(__dirname,'js.test/test/mobile1.html')
    res.sendFile(indexPath);
})

app.get('/index', function (req, res) {
    var indexPath = path.join(__dirname,'js.test/phoneTest/index.html')
    res.sendFile(indexPath);
})


var server = app.listen(3002, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
