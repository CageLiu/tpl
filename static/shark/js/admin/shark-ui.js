/*
 * ui operation for sharkcms
 * author shaman
 * last edit on 2011-08-09
 */

$(function(){
	//初始化
	if(window.localStorage){
		var _frames=window.localStorage,
			_status=new Array(), //界面暂存
			skin=["skin_00.css","skin_01.css","skin_02.css","skin_03.css","skin_04.css"];  //皮肤列表;
		_frames.setItem("status",JSON.stringify(_status));
		if(!_frames.getItem("skin")){
			_frames.setItem("skin",skin[0]); //默认皮肤
		}
		var _style=_frames.getItem("skin"),_base_url="../static/css/admin/";
	}else{
		alert("您的浏览器不支持本地存储！请使用火狐或者谷歌浏览器！");
	}
	
	var _wsp=$(".workspace"),
		_mc=$(".main_cont"),
		_taskbar=$(".taskbar"),
		cur_wpi=0; //全局当前工作区索引
		
	//open_iframe(cur_wpi,"help/help.html"); //默认打开帮助页
		
	$("<link/>",{
		id:"skin_link",
		"type":"text/css",
		"rel":"stylesheet",
		"href":_base_url+_style
	}).appendTo("head");
	
	$(".switch_skin").click(function(){ //换肤
		set_style(skin[$(this).index()]);
		$(".skin_box").hide();
	})
	$("body").click(function(e){
		if($(e.target).attr("class")!="skin_btn"){
		  $(".skin_box").hide();
		}
	})
	$(".skin_btn").click(function(){
		$(".skin_box").toggle();
	})
	
	$("#left_nav a").click(function(){  //左部菜单链接页面加载
		var wpi=cur_wpi,url=$(this).attr("href");
		if(url!="#"){
			$("#help_frame").hide();
			open_iframe(wpi,url);
		}
		return false;
	})
	$(".switch_workspace span").click(function(){ //刷新工作区索引
		cur_wpi=$(this).index();
	})
	
	$(".close_frame").live(  //删除窗口
		"click",function(e){
			if(e && e.stopPropagation){
			  e.stopPropagation();
			}
			var url=$(this).parent().attr("title");
			$("iframe[id='"+url+"']").remove();
			$(this).parent().remove();
			del_window_status(url);
		}
	)
	
	/*
	 * 换肤
	 * @param new_style 换肤新的css样式表
	 */
	function set_style(new_style){
		_frames.setItem("skin",new_style);
		$("#skin_link").attr("href",_base_url+new_style);
	}

	/*
	 * 打开新窗口
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function open_iframe(wpi,url){
		if(!is_opening(url).is_open){
			var cur_mc=_mc.eq(wpi);
			cur_mc.find("iframe").hide();
			$("<iframe/>",{
				"id":url,
				"src":url,
			}).appendTo(cur_mc);
			creat_taskbar(wpi,url); //创建任务栏
			set_window_status(wpi,url); //设置新窗口的本地存储信息
		}else{
			var wpi=is_opening(url).wpi;
			switch_wps(wpi);
			_wsp.eq(wpi).find("iframe").hide();
			$("iframe[id='"+url+"']").show();
			_taskbar.eq(wpi).find("li").removeClass("current");
			_taskbar.eq(wpi).find("li[title='"+url+"']").addClass("current");
		}
	}
	
	/*
	 * 设置新窗口的本地存储信息
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function set_window_status(wpi,url){ 
		var _status=JSON.parse(_frames.status),
			new_frame={
				frame_name:url,
				wpi:wpi
			};
		_status.push(new_frame);
		_frames.setItem("status",JSON.stringify(_status));
	}
	
	/*
	 * 删除窗口的本地存储信息
	 * @param url 窗口所打开页面的名称
	 */
	function del_window_status(url){
		var _status=del_elem(url,JSON.parse(_frames.status));
		_frames.setItem("status",JSON.stringify(_status));
	}
	
	/*
	 * 创建任务栏
	 * @param wpi 当前所属的workspace区索引
	 * @param url 新窗口所打开页面的名称
	 */
	function creat_taskbar(wpi,url){
		var taskbar=_taskbar.eq(wpi);
		taskbar.find("li").removeClass("current");
		$("<li/>",{
			"title":url,
			"class":"current",
			html:url+'<span class="close_frame" title="关闭">x</span>',
			click:function(){
				var url=$(this).attr("title");
				_wsp.eq(wpi).find("iframe").hide();
				$("iframe[id='"+url+"']").show();
				_taskbar.find("li").removeClass("current");
				_taskbar.eq(wpi).find("li[title='"+url+"']").addClass("current");
			}
		}).appendTo(taskbar);
	}
	
	/*
	 * 判断当前页是否打开引
	 * @param url 需要判断的页面名称
	 * @return JSON, is_open为是否打开, wpi为打开所在工作区的索引
	 */
	function is_opening(url){
		var status=JSON.parse(_frames.status),
			open_info={
				is_open:false,
				wpi:null
			};
		if(status.length==0){
			return open_info;
		}else{
			for(var i=0;i<status.length;i++){
				if(url==status[i].frame_name){
					open_info.is_open=true;
					open_info.wpi=status[i].wpi;
					return open_info;
				}
			}
			return open_info;
		}
	}
	
	/*
	 * 切换工作区
	 * @param index 需要的切换工作区的索引值
	 */
	function switch_wps(index){
		var wsp_Height = _wsp.height();
		if(index!=cur_wpi){
			_wsp.eq(0).stop().animate({"margin-top":-index * wsp_Height},{duration:"speed",easing:"swing"});
			_wsp.animate({"opacity":0},"fast");
			_wsp.eq(index).animate({"opacity":1},"speed");
		}
		cur_wpi=index;
	}
	
	/*
	 * 判断元素是否存在数组中
	 * @param elem 需要的元素的值
	 * @param arr 目标数组
	 * @return boolean
	 */
	function is_in_array(elem,arr){
		$.each(arr,function(i,_elem){
			if(elem==_elem){
				return true;
			}
		})
		return false;
	}
	
	/*
	 * 删除数组中某个元素
	 * @param elem 需要删除的元素的值
	 * @param arr 目标数组
	 * @return Array 返回一个新的数组,如果删除元素不在目标数组中则返回目标数组
	 */
	 function del_elem(elem,arr){
	 	var tempa=[];
		$.each(arr,function(i,_item){
			if(typeof(_item)=="object"){
				if(elem!=_item.frame_name)tempa.push(_item);
			}else{
				if(elem!=_item)tempa.push(_item);
			}
		})
		return tempa;
	 }
})