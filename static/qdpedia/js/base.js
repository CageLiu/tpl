/*
 * qdpedia base javascript
 */

monkey.M.addEvent(window,"load",function(){
	var sb_scroll = new monkey.O.scrollbar("sb_slider","sb_ct");
	var left_v_scroll = new monkey.O.scrollbar("lvslider","left_ct");
	var left_h_scroll = new monkey.O.scrollbar("lhslider","left_ct",{dire : "x"});
	var dia = new monkey.O.dialog("head","mod_view");
});

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
}
