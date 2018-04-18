$(document).ready(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	

  $("#addHouse").click(function(){
    $("#subAddHouse").slideToggle("slow");
  });

  $("#mngHouse").click(function(){
      $("#subMngHouse").slideToggle("slow");
  });

  $("#addResold").click(function(){
    window.location.href="index/addresold";
  });
});

$(window).resize(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	
});