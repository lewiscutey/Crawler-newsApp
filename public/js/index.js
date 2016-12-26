/**
 * Created by Lewis on 2016/12/2.
 */
$(function () {
//设计尺寸统一规范
    function resise(designSize,type) {
        var type= type || "x";
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if(type == "x"){
            var scale = width/designSize*100+"px";
        }else if(type == "y"){
            var scale = height/designSize*100+"px";
        }
        document.getElementsByTagName("html")[0].style.fontSize = scale;
    }
    resise(750);

//swiper插件启用
    var mySwiper = new Swiper ('.swiper-container', {
        // 如果需要分页器
        // pagination: '.swiper-pagination',

        //添加动画
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }

    });

//主页菜单导航
    var navXinwen = $("#nav .xinwen");
    navXinwen.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".list .menu").css("display","none");
        $("#index").css("display","block");
    });
    var navLuntan = $("#nav .luntan");
    navLuntan.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".list .menu").css("display","none");
        $("#luntan").css("display","block");
    });
    var navXiaoxi = $("#nav .xiaoxi");
    navXiaoxi.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".list .menu").css("display","none");
        $("#xiaoxi").css("display","block");
    });
    var navWode = $("#nav .wode");
    navWode.on("click",function () {
        $("#nav .item").removeClass("active");
        $(this).addClass("active");
        $(".list .menu").css("display","none");
        $("#wode").css("display","block");
    });

//内容页面的分享按钮
    $(".content .nav").hover(function () {
        $(this).next(".share").stop().slideToggle();
    });
    $(".content .pinglun .share").hover(function () {
        $(".content .title .share").stop().slideToggle();
    });

//内容页面的分享和收藏按钮
    $(".content .pinglun i").on("click",function () {
       $(this).css("color","red");
    });

//新闻页面菜单按钮
    $(".news .title .nav").hover(function () {
        $(".news .title .nav-menu").stop().slideToggle();
    });


});