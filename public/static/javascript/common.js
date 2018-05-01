//图片完整路径前缀(服务器)
// window.avatar_prefix = '/myfcBackEnd/public/static/personal/';
//图片完整路径前缀(本地)
window.avatar_prefix = '/static/personal/';
//图片完整路径前缀(服务器)
// window.house_prefix ='/myfcBackEnd/public/static/houseImage/';
//图片完整路径前缀(本地)
window.house_prefix ='/static/houseImage/';
//图片完整路径前缀(服务器)
// window.carousel_prefix= '/myfcBackEnd/public/static/carousel/';
//图片完整路径前缀(本地)
window.carousel_prefix  = '/static/carousel/';
$(document).ready(function(){
    //页面跳转事件
    $("#addResold").click(function(){
        window.location.href="?s=/index/Add_house/addResold";
    });
    $("#addRent").click(function(){
        window.location.href="?s=/index/Add_house/addRent";
    });
    $("#mngResold").click(function(){
        window.location.href="?s=/index/Manage_house/mngResold";
    });
    $("#mngRent").click(function(){
        window.location.href="?s=/index/Manage_house/mngRent";
    });

    $("#mdfStuff").click(function(){
        window.location.href="?s=/index/stuff/modifyAgency";
    });

    $("#addStuff").click(function(){
        window.location.href="?s=/index/stuff/addAgency";
    });

    $("#mngStore").click(function(){
        window.location.href="?s=/index/Manage_Store/getStoreInfo";
    });
    $("#addRecommend").click(function(){
        window.location.href="?s=/index/Manage_Recommend/getRecommendInfo";
    });
    $("#advertising").click(function(){
        window.location.href="?s=/index/advertising/addAdPic";
    });

});

(function () {　　
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {　　
        handleFontSize();
    } else {　　
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
})();