$(document).ready(
	function(){

		if($.browser.msie){
			document.write("<div style='font-size:200px;color:#f00;line-height:3em;font-weight:bold;text-align:center'>用IE，要枪毙！</div>");
		}



		var $t = $(".menu dt");
		$("i.hide").eq(0).css("display","block");
		$t.siblings("dd").eq(0).css("display","block");
		$t.click(function(){
			if($(this).next("dd").css("display") == "none"){
				$(this).next("dd").slideDown("speed");
				$(this).find("i.show").css("display","none");
				$(this).find("i.hide").css("display","block");
			}
			else{ 
				$(this).next("dd").slideUp("speed");
				$(this).find("i.show").css("display","block");
				$(this).find("i.hide").css("display","none");
			}
		});
		var $m = $(".menu dd li");
		$m.click(function()
			{
			$m.removeClass();
			$(this).addClass("current");
		});
		var $b = $(".toggle_btn");
		$b.toggle(function(){
			$("#page").css("margin-left","4px");
			$(".user").css("width",0);
		},
		function(){
			$("#page").css("margin-left","200px");
			$(".user").css("width","196px");
		}
		);

	/*
	 * demo page js start
	 */
	var $mOnff = $(".menu_onff");
	var $mainMenu = $(".main_menu");
	var $menuBox = $(".main_menu dl");
	var $menuTitle = $menuBox.children("dt");
	var $menuItem = $menuBox.children("dd");
	var $workspace = $(".workspace");
	var $logo = $(".logo");
	var $mainCont = $(".main_cont");
	var $panle = $(".panle");
	var $switchBtn = $(".switch_workspace span");
	var workspaceHeight = $workspace.height();
	var count = 0;

	
	$menuBox.css("height",$mainMenu.height() - $logo.outerHeight() + "px");
	$mainCont.css("height",$workspace.height()-$panle.outerHeight() * 2 - 3 + "px");
	$(window).resize(
		function(){
			$menuBox.css("height",$mainMenu.height() - $logo.outerHeight() + "px");
			$mainCont.css("height",$workspace.height()-$panle.outerHeight() * 2 -3 + "px");
			$workspace.eq(0).css("margin-top",-count*$workspace.height()+ "px");
	});

	$menuTitle.click(function(){
		if($(this).hasClass("show")){
			$(this).removeClass("show");
			$(this).next("dd").slideUp("speed");
		}
		else{
			$menuTitle.removeClass("show");
			$menuItem.slideUp("speed");
			$(this).addClass("show");
			$(this).next("dd").slideDown("speed");
		}
	});

	$mOnff.toggle(
	function(){
		$mainMenu.stop().animate({"left":"-195px"},{duration:"fast",easing:"linear"});
		$workspace.stop().animate({"marginLeft":"5px"},{duration:"fast",easing:"linear"});
		$(this).attr("title","展开菜单");
	},
	function(){
		$mainMenu.stop().animate({"left":0},{duration:"fast",easing:"linear"});
		$workspace.stop().animate({"marginLeft":"200px"},{duration:"fast",easing:"linear"});
		$(this).attr("title","收起菜单");
	});

/*
 *    $userBox.find("i").click(function(event){
 *        $(this).addClass("show");
 *        $userBox.find("ul").slideDown("speed");
 *        event.stopPropagation();
 *    });
 *
 *    $("body").click(function(){
 *        $userBox.find("ul").slideUp("fast");
 *        $userBox.find("i").removeClass("show");
 *    });
 */

/*
 *    $switchBtn.click(function(){
 *        var workspaceHeight = $workspace.height();
 *        if(!$(this).hasClass("current")){
 *        $workspace.eq(0).stop().animate({"margin-top":-$(this).index() * workspaceHeight},{duration:"speed",easing:"swing"});
 *        $workspace.animate({"opacity":0},"fast");
 *        $workspace.eq($(this).index()).animate({"opacity":1},"speed");
 *        count = $(this).index();
 *        }
 *    });
 *
 */

/*快捷键 start*/
/*
 *    var numkey = ["alt+1","alt+2","alt+3","alt+4"];
 *
 *    $.each(numkey,function(i,n){
 *        $.hotkeys.add(n,function(){
 *            var workspaceHeight = $workspace.height();
 *            $workspace.eq(0).stop().animate({"margin-top":-i * workspaceHeight},{duration:"speed",easing:"swing"});
 *            $workspace.css("visibility","hidden");
 *            $workspace.eq(i).css("visibility","visible");
 *            count = i;
 *        });	
 *    });
 */

/*快捷键 end*/





	/*
	 * demo page js end
	 */
	}
);

function tabChange(list,cont){
	var tab=document.getElementById(list);
	if(document.getElementById(list)==null){
		return false;
		}else{
		var aa=tab.getElementsByTagName("a");
		var tabwarp=document.getElementById(cont);
		var tabCont=tabwarp.getElementsByTagName("div");
		for(var i=0;i<aa.length;i++){
			aa[i].index=i;
			aa[i].onclick=function(){
				for(var i=0;i<aa.length;i++){
					aa[i].className="";
					tabCont[i].style.display="none";
				}
				this.className="current";
				tabCont[this.index].style.display="block";
			}
		}
	}
}
window.onload=function (){
	tabChange("tag","tag_cont_wrap");
}