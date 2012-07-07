/*
   ____   __
  / __'\ /\'\      ______   ______   ______ TM
 /\ \Z\ \\ \ \    /\  __'\ /\  __'\ /\  __'\
 \ \  __ \\ \ \___\ \ \Z\ \\ \ \Z\ \\ \ \Z\ \
  \ \_\ \ \\ \____\\ \_____\\ \_\ \_\\ \____ \
   \/_/\/_/ \/____/ \/_____/ \/_/\/_/ \/___Z\ \
                                        /\_____\
                        http://dlog.org \/_____/
*/
(function($) {
	$.fn.jSlider = function(options) {
		var opts = $.extend({}, $.fn.jSlider.default, options);
		var index = 1;
		var targetLi = $("." + opts.claNav + " li", $(this)); //目标对象
		var clickNext = $("." + opts.claNav + " .next", $(this)); //点击下一个按钮
		var clickPrev = $("." + opts.claNav + " .prev", $(this)); //点击上一个按钮
		var ContentBox = $("." + opts.claCon, $(this)); //滚动的对象
		var ContentBoxNum = ContentBox.children().size(); //滚动对象的子元素个数
		var slideH = ContentBox.children().first().height(); //滚动对象的子元素个数高度，相当于滚动的高度
		var slideW = ContentBox.children().first().width(); //滚动对象的子元素宽度，相当于滚动的宽度
		var autoPlay;
		var slideWH;
		if (opts.effect == "DirY" || opts.effect == "Txt") {
			slideWH = slideH;
		} else if (opts.effect == "DirX" || opts.effect == "Loop") {
		ContentBox.css("width", ContentBoxNum * slideW);
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
						ContentBox.find("li:first", $this).appendTo(ContentBox);
					}
					ContentBox.css({"left": "0"});
				});
				event.preventDefault();
			});
			clickPrev.click(function(event) {
				for (var i = 0; i < opts.steps; i++) {
					ContentBox.find("li:last").prependTo(ContentBox);
				}
				ContentBox.css({
					"left": -index * opts.steps * slideW
				});
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
		});
	};
	$.fn.jSlider.default = {
		effect: "DirY",
		autoPlay: true,
		speed: "normal",
		timer: 1000,
		defIndex: 0,
		claNav: "jslider_handler",
		claCon: "jslider_content",
		steps: 1
	};
	$.fn.jSlider.effectLoop = {
		scrollLeft: function(contentObj, navObj, i, slideW, opts, callback) {
			contentObj.animate({
				"left": -i * opts.steps * slideW
			}, opts.speed, callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},

		scrollRight: function(contentObj, navObj, i, slideW, opts, callback) {
			contentObj.stop().animate({
				"left": 0
			}, opts.speed, callback);
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
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		},
		Txt: function(contentObj, undefined, i, slideH, opts) {
			//alert(i*opts.steps*slideH);
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
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		DirY: function(contentObj, navObj, i, slideH, opts) {
			contentObj.stop().animate({ "top": -i * opts.steps * slideH }, opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		}
	};
})(jQuery);