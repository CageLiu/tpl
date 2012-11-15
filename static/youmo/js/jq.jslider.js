(function($) {

	$.fn.jSlider = function(options) {
		var dd = {
			effect: "DirY",
			autoPlay: true,
			speed: "normal",
			timer: 1000,
			defIndex: 0,
			claNav: "jslider_handler",
			claCon: "jslider_content",
			steps: 1,
			parentBox : "box",
			box : "scroll_box"
		};
		var opts = $.extend({}, dd, options);
		var index = 1;
		var targetLi = $("." + opts.claNav,$(this).parents("." + opts.parentBox).eq(0)).children(); //目标对象
		var clickNext = $("." + opts.claNav + " .next", $(this).parents("." + opts.parentBox).eq(0)); //点击下一个按钮
		var clickPrev = $("." + opts.claNav + " .prev", $(this).parents("." + opts.parentBox).eq(0)); //点击上一个按钮
		var ContentBox = $("." + opts.claCon, $(this)); //滚动的对象
		var ContentBoxNum = ContentBox.children().size(); //滚动对象的子元素个数
		var slideH = ContentBox.children().first().outerHeight(true); //滚动对象的子元素个数高度，相当于滚动的高度
		var slideW = ContentBox.children().first().outerWidth(true); //滚动对象的子元素宽度，相当于滚动的宽度
		var autoPlay;
		var slideWH;
		if(Math.round(ContentBox.parents("." + opts.box).width() / slideW) > ContentBox.children().length || Math.round(ContentBox.parents("." + opts.box).height() / slideH) > ContentBox.children().length){
			return false;
		}
		if (opts.effect == "DirY" || opts.effect == "Txt") {
			slideWH = slideH;
		} else if (opts.effect == "DirX" || opts.effect == "Loop") {
			ContentBox.css("width", (ContentBoxNum + 1) * slideW * 2);
			ContentBox.children().clone(true).appendTo(ContentBox);
			slideWH = slideW;
		} else if (opts.effect == "Fade") {
			ContentBox.children().first().css("z-index", "1");
		}

		return this.each(function() {
			var $this = $(this);
			//滚动函数
			var doPlay = function() {
				$.fn.jSlider.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);
				index++;
				if (index * opts.steps >= ContentBoxNum) {
					index = 0;
				}
			};
			clickNext.click(function(event) {
				$.fn.jSlider.effectLoop.scrollLeft(ContentBox, targetLi, index, slideWH, opts, function() {
					for (var i = 0; i < opts.steps; i++) {
						ContentBox.children().first().appendTo(ContentBox);
					}
					ContentBox.css({"left": "0"});
				});
				event.preventDefault();
			});
			clickPrev.click(function(event) {
				for (var i = 0; i < opts.steps; i++) {
					ContentBox.children().last().prependTo(ContentBox);
				}
				ContentBox.css({"left": -opts.steps * slideW});
				$.fn.jSlider.effectLoop.scrollRight(ContentBox, targetLi, index, slideWH, opts);
				event.preventDefault();
			});
			//自动播放
			if (opts.autoPlay) {
				autoPlay = setInterval(doPlay, opts.timer);
				ContentBox.hover(function() {
					if (autoPlay) { clearInterval(autoPlay); }
				}, function() {
					if (autoPlay) { clearInterval(autoPlay); }
					autoPlay = setInterval(doPlay, opts.timer);
				});
			}

			//目标事件
			targetLi.hover(function() {
				if (autoPlay) { clearInterval(autoPlay); }
				index = targetLi.index(this);
				window.setTimeout(function() {
					$.fn.jSlider.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);
				}, 200);
			}, function() {
				if (autoPlay) { clearInterval(autoPlay); }
				autoPlay = setInterval(doPlay, opts.timer);
			});
			clickNext.unbind("hover");
			clickPrev.unbind("hover");
		});
	};
	$.fn.jSlider.effectLoop = {
		scrollLeft: function(contentObj, navObj, i, slideW, opts, callback) {
						contentObj.animate({
							"left": -i * opts.steps * slideW
						}, opts.speed, callback);
						if (navObj) {
							navObj.eq(i).addClass("current").siblings().removeClass("current");
						}
					},

		scrollRight: function(contentObj, navObj, i, slideW, opts, callback) {
						 contentObj.stop().animate({
							 "left": 0
						 }, opts.speed, callback);
						 if (navObj) {
							 navObj.eq(i).addClass("current").siblings().removeClass("current");
						 }
					 }
	}
	$.fn.jSlider.effect = {
		Fade: function(contentObj, navObj, i, slideW, opts) {
				  contentObj.children().eq(i).stop().animate({
					  opacity: 1
				  }, opts.speed).css({
					  "z-index": "1"
				  }).siblings().animate({
					  opacity: 0
				  }, opts.speed).css({
					  "z-index": "0"
				  });
				  navObj.eq(i).addClass("current").siblings().removeClass("current");
			  },
		Txt: function(contentObj, undefined, i, slideH, opts) {
				 contentObj.animate(
						 { "margin-top": -opts.steps * slideH }, 
						 opts.speed, 
						 function() {
							 for (var j = 0; j < opts.steps; j++) {
								 contentObj.find("li:first").appendTo(contentObj);
							 }
							 contentObj.css({ "margin-top": "0" });
						 });
			 },
		DirX: function(contentObj, navObj, i, slideW, opts, callback) {
				  contentObj.stop().animate(
						  { "left": -i * opts.steps * slideW }, 
						  opts.speed, 
						  callback
						  );
				  if (navObj) {
					  navObj.eq(i).addClass("current").siblings().removeClass("current");
				  }
			  },
		DirY: function(contentObj, navObj, i, slideH, opts) {
				  contentObj.stop().animate({ "top": -i * opts.steps * slideH }, opts.speed);
				  if (navObj) {
					  navObj.eq(i).addClass("current").siblings().removeClass("current");
				  }
			  },
		Loop : function(){

			   }
	};
})(jQuery);

;;
function cur(ele,currentClass,tag){
	ele= $(ele)? $(ele):ele;
	if(!tag){
		ele.addClass(currentClass).siblings().removeClass(currentClass);
	}else{
		ele.addClass(currentClass).siblings(tag).removeClass(currentClass);
	}
}
$.fn.tab=function(options){
	var org={
		tabId:    "",
		tabTag:   "",
		conId:    "",
		conTag:   "",
		curClass: "current",
		act:      "click",
		dft:      0,
		effact:   null,
		auto:     false,
		autotime: 3000,
		aniSpeed: 500,
		visible : false
	}	

	$.extend(org,options);

	var t=false;
	var k=0;
	var _this=$(this);
	var tagwrp=$(org.tabId);
	var conwrp=$(org.conId);
	var tag=tagwrp.find(org.tabTag);
	var con=conwrp.find(org.conTag);	
	var len=tag.length;
	var taght=parseInt(tagwrp.css("height"));
	var conwh=conwrp.get(0).offsetWidth;
	var conht=conwrp.get(0).offsetHeight;
	var curtag=tag.eq(org.dft);
	//prepare
	cur(curtag,org.curClass);
	if(org.visible){
		con.eq(org.dft).css({"visibility":"visible","height":"auto","overflow":"visible","margin":"11px 0"}).siblings(org.conTag).css({"visibility":"hidden","height":"0","overflow":"hidden","margin":"0"});
	}else{
		con.eq(org.dft).show().siblings(org.conTag).hide();
	}

	if(org.effact=="scrollx"){
		var padding=parseInt(con.css("padding-left"))+parseInt(con.css("padding-right"));										
		_this.css({
			"position"   :"relative",
			"height"     :taght+conht+"px",
			"overflow"   :"hidden" 
		});				

		conwrp.css({
			"width"     :len*conwh+"px",
			"height"    :conht+"px",
			"position"  :"absolute",
			"top"       :taght+"px"
		});

		con.css({
			"float"        :"left",
			"width"        :conwh-padding+"px",
			"display"      :"block"
		});
	}

	if(org.effact=="scrolly"){
		var padding=parseInt(con.css("padding-top"))+parseInt(con.css("padding-bottom"));										
		_this.css({
			"position"   :"relative",
			"height"     :taght+conht+"px",
			"overflow"   :"hidden" 
		});
		tagwrp.css({
			"z-index"   :100
		})		
		conwrp.css({
			"width"     :"100%",
			"height"    :len*conht+"px",
			"position"  :"absolute",
			"z-index"   :99												 
		})		
		con.css({
			"height"       :conht-padding+"px",
			"float"        :"none",											
			"display"      :"block"
		});
	}	

	tag.css({"cursor":"pointer"})
		.each(function(i){
			tag.eq(i).bind(org.act,function(){
				cur(this,org.curClass);	
				k=i;
				switch(org.effact){					
					case "slow"    : con.eq(i).show("slow").siblings(org.conTag).hide("slow");
									 break;
					case "fast"    : con.eq(i).show("fast").siblings(org.conTag).hide("fast");
									 break;
					case "scrollx" : conwrp.animate({left:-i*conwh+"px"},org.aniSpeed);
									 break;
					case "scrolly" : conwrp.animate({top:-i*conht+taght+"px"},org.aniSpeed);
									 break;
					default: 
									 if(org.visible){
										 con.eq(i).css({"visibility":"visible","height":"auto","overflow":"visible","margin":"11px 0"}).siblings(org.conTag).css({"visibility":"hidden","height":"0","overflow":"hidden","margin":"0"});
									 }else{
										 con.eq(i).show().siblings(org.conTag).hide();
									 }
									 break;
				}			
			}		
			)									  
		})	

	if(org.auto){		
		var drive=function(){
			if(org.act=="mouseover"){
				tag.eq(k).mouseover();
			}else if(org.act=="click"){
				tag.eq(k).click();
			}			
			k++;			
			if(k==len) k=0;			
		}
		t=setInterval(drive,org.autotime);	
	}		
}
