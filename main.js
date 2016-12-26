var read = require("./read");
var write = require("./write");
var async = require("async");
var mysql = require("./mysql");
var path = require("path");

var categoryInfo;
var listInfo = [];

async.series([
    //1.读栏目
    function (cb) {
        write.writeCategory("http://news.ifeng.com/",function (data) {
            categoryInfo = data;
            cb();
        });
    },
    //2.读列表
    function (cb) {
        async.each(categoryInfo,function (obj,cb1) {
            read.readList(obj.curl,function (list) {
                var obj1 = {};
                obj1.url = list;
                obj1.cid = obj.cid;
                listInfo.push(obj1);
                cb1();
            })
        },function () {
            cb();
        })
    },
    //3.写内容
    function (cb) {
        async.each(listInfo,function (obj,cb1) {
            async.each(obj.url,function (url,cb2) {
                write.writeArticle(url,function (data) {
                    var basename = "";
                    var imgArr = data.aimg.split(";");
                    for(var i=0;i<imgArr.length;i++){
                        basename += path.basename(imgArr[i])+";";
                    }
                    basename = basename.slice(0,-1);
                    mysql.query(`replace into article (atitle,acon,aimg,cid) values ('${data.atitle}','${data.acon}','${basename}',${obj.cid})`,function (error) {
                        cb2();
                    });
                })
            },function (error) {
                console.log(error);
                cb1();
            })
        },function (error) {
            console.log(error);
            cb();
        });
    }
],function () {
   console.log("done");
});
