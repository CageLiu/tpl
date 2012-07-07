$(document).ready(function(){
	var $tag = $("#project h3.tag");
	var $item = $("#project li.item");
	var $tip = $("#tip");
	var $links = $("#project .info li a");
	var $view = $("#preview");
	$tip.status = {};
	$tag.status = {};

	//ie6的li标签hover效果
	if($.browser.msie && $.browser.version == 6.0){
		$item.hover(function(){
			$item.css("border-left-color","#fff");
			$(this).css("border-left-color","#ff5b5b");
		});
	}

	Tipshow("财经频道前端开发已全部完成且已通过产品确认，可以进行模板嵌套了！","load",10000);

	//显示提示消息
	function Tipshow(tiptxt,statusValue,timer){
		if(!$tip.status[statusValue]){
			$tip.status[statusValue] = 1;
			$tip.find("span").html(tiptxt);
			$tip.fadeIn("speed");
			setTimeout(function(){
				$tip.fadeOut("speed");
			},timer);
		}
	}

	//关闭提示消息
	$tip.find("strong").click(function(){
		$tip.fadeOut(100);
	});

	//展开项目
	$tag.click(function(){
		var $p = $(this).parent("li.item");
		var $this = $(this)
		Tipshow("展开项目后，双击展开的区域可再次折叠!","item",8000);
		if(!$tag.status[$this.index("#project .tag")]){
			$p.addClass("loading")
			setTimeout(function(){
				$p.removeClass("close loading");
				$p.addClass("open");
				$tag.status[$this.index("#project .tag")] = 1;
			},1500)
		}
		else if($p.hasClass("close")){
			Tipshow("展开项目后，双击展开的区域可再次折叠!","item",8000);
			$p.removeClass("close");
			$p.addClass("open");
		}
		else{
			$p.removeClass("open");
			$p.addClass("close");
		}
	});

	//双击收起
	$item.dblclick(function(){
		$(this).removeClass("open");
		$(this).addClass("close");
	});

	$("#search input[type='text']").focus(function(){
		Tipshow("您也可以按 Ctrl+F 来搜索频道名字","search",5000);
	});

});
