var request = require("request");
var cheerio = require("cheerio");
var mysql = require("mysql");

module.exports.readCategory = function (url,callback) {
    request(url,function (error,head,body) {
        var $ = cheerio.load(body);
        var arr = [];
        $(".col_nav ul li").each(function (index,obj) {
            if(index==2 || index==3 || index==4 || index==6){
                var obj = {};
                var str = $(this).find("a").html();
                obj.curl = $(this).find("a").attr("href");
                obj.cname = unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));
                obj.cid = index;
                arr.push(obj);
            }
        });
        callback(arr);
    });
};

module.exports.readList= function (url,callback) {
    var arr = [];
    request(url,function (error,head,body) {
        var $ = cheerio.load(body);
        $(".juti_list h3 a").each(function () {
            var curl = $(this).attr("href");
            arr.push(curl);
        });
        callback(arr);
    });
};

var i=0;
module.exports.readArticle= function (url,callback) {
    request(url,function (error,head,body) {
        console.log(error+"--"+(++i));
        var $ = cheerio.load(body);
        var obj = {};
        var str = $("#artical_topic").html()?$("#artical_topic").html():"";
        obj.atitle = unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));
        var acon = $("#main_content").html()?$("#main_content").html():"";
        var imgs = "";
        acon = acon.replace(/<img[^src]+src="([^"]+)/g,function (one,two) {
            imgs += two+";";
            return one;
        }).replace(/<[^>]+>|<\/[^>]+>/g,"").replace(/\n/g,"");
        acon = unescape(acon.replace(/&#x/g,"%u").replace(/;/g,""));
        obj.acon = acon;
        obj.aimg = imgs.slice(0,-1);
        callback(obj);
    });
};