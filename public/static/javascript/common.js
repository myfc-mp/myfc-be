$(document).ready(function(){
    //页面跳转事件
    $("#addResold").click(function(){
        window.location.href="?s=/index/Add_house/addResold";
    });
    $("#addrent").click(function(){
        window.location.href="?s=/index/Add_house/addRent";
    });
    $("#mngResold").click(function(){
        window.location.href="?s=/index/Manage_house/mngResold";
    });
    $("#mngrent").click(function(){
        window.location.href="?s=/index/Manage_house/mngRent";
    });

    $("#mdfStuff").click(function(){
        window.location.href="?s=/index/stuff/modifyAgency";
    });

    $("#addStuff").click(function(){
        window.location.href="?s=/index/stuff/addAgency";
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