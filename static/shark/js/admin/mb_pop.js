;var sharkDialog=function(options,callback){
	var topDoc=window.top.document;
	var default_setting={  //默认设置
		title:"未命名弹窗",
		url:null,
		type:"iframe",
		//data:"No data or massage!",
		width:300,
		height:150,
		allowmax:false,
		button:{
			disabled:false,
			custom:null
		}
	}
	
	var opt=$.extend(default_setting,options), //扩展默认设置
		title=opt.title,
		url=opt.url,
		type=opt.type,
		//data=opt.data,
		width=opt.width,
		height=opt.height,
		pop_bh=opt.button.disabled?36:66,
		allowmax=opt.allowmax;
		
	var h=getWinSize().h,w=getWinSize().w;
	var	top_doc=$(topDoc).find("body"),//父级窗口
		mask='<div class="mask_layer" style="position:fixed"></div>',//遮罩层
		classtype=type=="alert"?"alertmsg":'',
		resize_btn=allowmax?'<a class="fullscreen" href="javascript:"></a>':'', //最大化窗口
		bottom_btn=opt.button.disabled?'':opt.button.custom!=null?
			'<div class="pop_bottom">'+opt.button.custom+'</div>':  //自定义按钮
			'<div class="pop_bottom"><a id="pop_btn_ok" class="pop_btn" href="javascript:"><span>确定</span></a>'+'<a id="pop_btn_cannel" class="pop_btn" href="javascript:"><span>取消</span></a></div>', //默认的连个按钮
		mb_pop_window='<div id="'+opt.id+'" class="pop" style="position:fixed;width:'+width+'px;height:'+height+'px;top:'+(h-height)/2+'px;left:'+(w-width)/2+'px">'+
							'<div class="pop_title">'+
								'<h2 class="pop_hd">'+title+'</h2>'+
								'<span class="pr pop_button">'+resize_btn+'<a title="关闭" class="close" href="javascript:"></a></span>'+
							'</div>'+
							'<div class="pop_cont">'+
								'<div class="pop_cont_c '+classtype+'" style="height:'+(height-pop_bh)+'px;padding:0">'+
								'</div>'+
							'</div>'+
								bottom_btn+
						  '</div>';
	$("#" + opt.id, top_doc).remove();
	
	switch(type){
		case "iframe":
			if(checkUrl(type)){
				var pop_cont_c=init();
				pop_cont_c.css({"overflow":"hidden"});
				$("<iframe/>",{
					src:url,
					//name:sharkDialog.iframeName,
					class:"perloading",
					style:"border:0;width:100%;height:100%;overflow:auto",
					load:function(){
						$(this).removeClass("perloading");
					}
				}).appendTo(pop_cont_c);
				if(!!callback)callback();
			}
			break;
		case "modal":
			if(checkUrl(type)){
				var h=getWinSize().h,w=getWinSize().w;
				var	_top=(h-height)/2,_left=(w-width)/2;
				window.open(url,title,'height='+height+',width='+width+',top='+_top+',left='+_left+',scrollbars=yes');
			}
			break;
		default:
			this.tips("Error: 错误的弹出类型参数！")
			return;
	}
	
	function getWinSize(){
		return {h:topDoc.documentElement.clientHeight,w:topDoc.documentElement.clientWidth}
	}
	function checkUrl(type){
		if(url==null){
			tips("Error: 类型"+type+"未指定url！","shark_tips_error");
			return false;
		}else{
			//这里可以验证url的正确性
			return true;
		}
	}
	function init(){
		$(mask).appendTo(top_doc);
		$(mb_pop_window).appendTo(top_doc);
		var pop_cont_c=$("#"+opt.id+" .pop_cont_c",top_doc);
		$("#"+opt.id+" .close",top.document).click(function(){_close()});
		$("#"+opt.id+" #pop_btn_ok",top.document).bind("click",_close);
		$("#"+opt.id+" #pop_btn_cannel",top.document).bind("click",_close);
		
		$("#"+opt.id+" .fullscreen",top_doc).live("click",function(){
		var h=getWinSize().h,w=getWinSize().w;
		$(this).attr("class","nomarlscreen").parents(".pop").css({height:h-2,width:w-2,top:0,left:0,opacity:1,marginTop:0,marginLeft:0})
				.find(".pop_cont_c").css({height:h-pop_bh});
		});
		$("#"+opt.id+" .nomarlscreen",top_doc).live("click",function(){
			var h=getWinSize().h,w=getWinSize().w;
			$(this).attr("class","fullscreen").parents(".pop")
					.css({height:height,width:width,top:(h-height)/2,left:(w-width)/2}).find(".pop_cont_c").css({height:height-pop_bh});
		});
		$(window).resize(function(){
			var h=getWinSize().h,w=getWinSize().w;
				pop_win=$("#"+opt.id,top_doc);
			if(pop_win.find(".nomarlscreen").length>0){
				pop_win.css({height:h-2,width:w-2,top:0,left:0,opacity:1,marginTop:0,marginLeft:0})
						.find(".pop_cont_c").css({height:h-pop_bh});
			}else{
				pop_win.css({top:(h-height)/2,left:(w-width)/2})
			}
		});
		
		return pop_cont_c;
	}
	
	function tips(msg,type){  //错误信息警告
		$(".shark_tips",topDoc).remove();
		$("<div/>",{
			class:!!type?"shark_tips "+type:"shark_tips",
			html:msg
		}).appendTo($("body",topDoc));
		var tip=$(".shark_tips",topDoc);
		tip.css("margin",-tip.outerHeight()/2+"px 0 0 "+(-tip.outerWidth()/2)+"px").delay(1000).fadeOut(350,function(){$(this).remove()});	
	}
	
	function _close(){
		//console.log("Closed!");
		_remove();
	}
	
	function _remove(){   //关闭时删除堆栈中对应的窗口
		$(".mask_layer",top.document).remove();
		$("#" + opt.id,top.document).remove();
		var i=0;
		for(var id in sharkDialog.stack){
			if(id == opt.id) sharkDialog.stack.splice(i, 1);
			i++;
		}
	}
	
	this.ok = function(fun){
		$("#"+opt.id,top.document).find("#pop_btn_ok").unbind().bind("click",fun);
	}
	
	this.close = function(){
		_close();
	}
	
	this.getId = function(){
		return opt.id;	
	}
	//console.log("Created!");
}

sharkDialog.stack = [];
sharkDialog.getDialog = function(win){
	var iframes=$("iframe", top.document);
	for(var i=0; i<iframes.length; i++){
		if(iframes[i].contentWindow == win){
			var id= $(iframes[i]).parents(".pop").attr("id");
			return this.stack[id];
		}
	}
	return null;
}
sharkDialog.getInstance = function(opt,callback){
	opt.id="popId_"+new Date().getTime();  //给窗口一个随机的id,保证其是唯一的
	top.sharkDialog = this;
	var dialog = new sharkDialog(opt,callback);
	this.stack[opt.id] = dialog;
}
sharkDialog.del = function(msg,callback){
	if(confirm(msg)){
		typeof(callback)=="string"?eval(callback):callback();
	}
}