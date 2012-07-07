$(document).ready(function(){
	var $body = $("body");
	var $header = $("#header");
	var $curposit = $("#cur_posit");
	var $frame = $("#frame");
	var setting={  //工作区初始设置
		top_nav:false,  //顶部工作区是否关闭
		left_nav:false  //左边工作区是否关闭
	}
	
	//初始化
	var default_set_top=setting.top_nav;
	top_nav();
	left_nav();
	fixed_set();
	
	//事件绑定
	$(window).resize(function(){fixed_set()});
	$("#spl").click(function(){
		setting.left_nav=setting.left_nav?false:true;
		left_nav();
	})
	$("#spt").click(function(){
		setting.top_nav=setting.top_nav?false:true;
		top_nav();
	})
	
	function fixed_set(){
		if(default_set_top){
			$frame.css("height",$body.height() - 38 + "px");
		}else{
			$frame.css("height",$body.height() - 98 + "px");
		}
	}
	function top_nav(){
		if(setting.top_nav){
			$header.css("margin-top","-60px");
			$frame.css("height",$frame.height()+60+"px");
		}else{
			$header.css("margin-top","0");
			$frame.css("height",$frame.height()-60+"px");
		}
	}
	function left_nav(){
		if(setting.left_nav){
			$frame.css("margin-left","0px")
		}else{
			$frame.css("margin-left","200px")
		}
	}
});
