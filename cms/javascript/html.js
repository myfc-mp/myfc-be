$(document).ready(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	

    $("#addHouse").click(function(){
      $("#subAddHouse").slideToggle("slow");
    });

    $("#mngHouse").click(function(){
        $("#subMngHouse").slideToggle("slow");
      });
    $("#shopMng").click(function(){
    	console.log($("body").innerWidth()); 
    });
  });

$(window).resize(function(){
	let px=Math.floor($("body").innerWidth()/50)-4;
	$("html").css("font-size",px+"px");	
});