$(document).ready(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	
  //导航淡入淡出事件
  $("#addHouse").click(function(){
    $("#subAddHouse").slideToggle("slow");
  });

  $("#mngHouse").click(function(){
      $("#subMngHouse").slideToggle("slow");
  });

  $("#mngStuff").click(function(){
    $("#subMngStuff").slideToggle("slow");
  });

  //页面跳转事件
  $("#addResold").click(function(){
    window.location.href="index/addresold";
  });

  $("#mdfStuff").click(function(){
    window.location.href="index/modifyAgency?XDEBUG_SESSION_START=14706";//跳转到修改经济人路由
  });

  $("#addStuff").click(function(){
    window.location.href="index/addAgency";//跳转到增加经济人路由
  });
});

$(window).resize(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	
});