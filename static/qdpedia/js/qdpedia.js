var monkey = {
	windowWidth : document.documentElement.clientWidth,
	windowHeight : document.documentElement.clientHeight
};
monkey.changeStyle = function(){
	var stylerules = [];
	var cw = 0,cc = 3;
	var oHead,style,rules,oldStyle;
	var ww = document.documentElement.clientWidth - 171;
	while(ww / cc > 400){ cc++; }
	while(ww / cc < 200){ cc--; }
	cw = ww / cc;
	stylerules.push(".item{width:",cw,"px;}");
	oHead = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	rules = document.createTextNode(stylerules.join(""));
	oldStyle = document.getElementById("itemrules");
	style.type = "text/css";
	style.id = "itemrules";
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	if(oldStyle){
		oldStyle.parentNode.removeChild(oldStyle);
	}
	oHead.appendChild(style);
};

;(function($){
	$.fn.extend({
		jQsc : function(cont,dire){
			cont = $(cont);
			bar = $(this).parent();
			dire = dire || "y";
			$(this).css("height","30px")
			$(this).bind("click",function(){
				alert($(this).attr("class"))
			})
		}
	});
})(jQuery);

$(document).ready(function(){
	$("#sb_slider").jQsc("#sb_st");
})
