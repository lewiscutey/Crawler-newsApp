var read = require("./read");
var http = require("http");
var fs = require("fs");
var mysql = require("./mysql");
var async = require("async");
var path = require("path");


module.exports.writeCategory = function (url,callback) {
    var nwedata;
    read.readCategory(url,function (data) {
        newdata = data;
       async.each(data,function (obj,cb) {
           mysql.query(`replace into category(cname,curl,cid) values ('${obj.cname}','${obj.curl}',${obj.cid})`,function () {
               cb();
           });
       },function (error,data) {
           callback(newdata);
           console.log("category done!");
       });

    });
};

module.exports.writeArticle = function (url,callback) {
    var newdata;
    read.readArticle(url,function (data) {
        newdata = data;
        if(data.aimg!==""){
            var imgarr = data.aimg.split(";");
            async.each(imgarr,function (url,cb) {
                if(/\.(png|jpg|jpeg|gif)/.test(url)){
                    http.get(url,function (res) {
                        var basename = path.basename(url);
                        res.pipe(fs.createWriteStream("./public/img/contents/cons/"+basename));
                        cb();
                    });
                }
            },function () {
                callback(newdata);
            });
        }

    });
};





