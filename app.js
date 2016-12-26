var express = require("express");
var mysql = require("./mysql");
var ejs = require("ejs");
var app = express();
app.listen(8888);

app.set("views","./views");
app.set("view engine","ejs");
app.use(express.static("public"));
// app.use('/static', express.static(__dirname + '/public'));

app.get("/",function (req,res) {
   mysql.query("select * from category",function (error,rows) {
       res.render("index");
   });
});
app.get("/login",function (req,res) {
    mysql.query("select * from category",function (error,rows) {
        res.render("login");
    });
});
app.get("/category",function (req,res) {
    mysql.query("select * from category",function (error,rows) {
        res.render("category",{categorys:rows});
    });
});
app.get("/list/:id",function (req,res) {
    var cid = req.params.id;
    mysql.query("select * from article where cid="+cid+"",function (error,rows,fields) {
        res.render("list",{lists:rows});
    });
});
app.get("/show/:id",function (req,res) {
    var id = req.params.id;
    mysql.query("select * from article where id="+id+"",function (error,rows,fields) {
        res.render("show",{shows:rows});
    });
});