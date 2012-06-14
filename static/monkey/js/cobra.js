/*
 * Cobra Javascript Library v1.0
 * Copyright 2012,Cage
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date : May 05 2012
 */

(function(){
	var cobra = function(selector,context){
		return new cobra.init(selector,context);
	};

	cobra.init = function(selector,context){
		selector = selector || document;
		if(selector === window || selector === document){
			this.query = [selector];
			this.length = 1;
			this.selector = selector;
			return this;
		}
		this.query = (function(){
			
			var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
				exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
				exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
				exprNodeName = /^([\w\*\-_]+)/,
				na = [null,null];
			
			function _find(selector, context) {
				context = context || document;
				var simple = /^[\w\-_#]+$/.test(selector);
				if(selector.nodeType){
					return [selector];
				}
				if (!simple && context.querySelectorAll) {
					return realArray(context.querySelectorAll(selector));
				}
				if (selector.indexOf(',') > -1) {
					var split = selector.split(/,/g), ret = [], sIndex = 0, len = split.length;
					for(; sIndex < len; ++sIndex) {
						ret = ret.concat( _find(split[sIndex], context) );
					}
					return unique(ret);
				}
				var parts = selector.match(snack),
					part = parts.pop(),
					id = (part.match(exprId) || na)[1],
					className = !id && (part.match(exprClassName) || na)[1],
					nodeName = !id && (part.match(exprNodeName) || na)[1],
					collection;
				if (className && !nodeName && context.getElementsByClassName) {
					collection = realArray(context.getElementsByClassName(className));
				} else {
					collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
					if (className) {
						collection = filterByAttr(collection, 'className', RegExp('(^|\\s)' + className + '(\\s|$)'));
					}
					if (id) {
						var byId = context.getElementById(id);
						return byId?[byId]:[];
					}
				}
				return parts[0] && collection[0] ? filterParents(parts, collection) : collection;
			}
			function realArray(c) {
				try {
					return Array.prototype.slice.call(c);
				} catch(e) {
					var ret = [], i = 0, len = c.length;
					for (; i < len; ++i) {
						ret[i] = c[i];
					}
					return ret;
				}
			}
			
			function filterParents(selectorParts, collection, direct) {
				var parentSelector = selectorParts.pop();
				if (parentSelector === '>') {
					return filterParents(selectorParts, collection, true);
				}
				var ret = [],
					r = -1,
					id = (parentSelector.match(exprId) || na)[1],
					className = !id && (parentSelector.match(exprClassName) || na)[1],
					nodeName = !id && (parentSelector.match(exprNodeName) || na)[1],
					cIndex = -1,
					node, parent,
					matches;
				nodeName = nodeName && nodeName.toLowerCase();
				while ( (node = collection[++cIndex]) ) {
					parent = node.parentNode;
					do {
						matches = !nodeName || nodeName === '*' || nodeName === parent.nodeName.toLowerCase();
						matches = matches && (!id || parent.id === id);
						matches = matches && (!className || RegExp('(^|\\s)' + className + '(\\s|$)').test(parent.className));
						if (direct || matches) { break; }
					} while ( (parent = parent.parentNode) );
					if (matches) {
						ret[++r] = node;
					}
				}
				return selectorParts[0] && ret[0] ? filterParents(selectorParts, ret) : ret;
			}
			var unique = (function(){
				var uid = +new Date();
				var data = (function(){
					var n = 1;
					return function(elem) {
						var cacheIndex = elem[uid],
							nextCacheIndex = n++;
						if(!cacheIndex) {
							elem[uid] = nextCacheIndex;
							return true;
						}
						return false;
					};
				})();
				return function(arr) {
					var length = arr.length,
						ret = [],
						r = -1,
						i = 0,
						item;
					for (; i < length; ++i) {
						item = arr[i];
						if (data(item)) {
							ret[++r] = item;
						}
					}
					uid += 1;
					return ret;
				};
			})();
			function filterByAttr(collection, attr, regex) {
				var i = -1, node, r = -1, ret = [];
				while ( (node = collection[++i]) ) {
					if (regex.test(node[attr])) {
						ret[++r] = node;
					}
				}
				return ret;
			}
			return _find;
		}())(selector,context);
		this.length = this.query.length;
		this.selector = selector;
	};

	cobra.fn = cobra.init.prototype = {
		constructor : cobra,

		offset : function(){
					 
		},
		position : function(){
				   
		},

		/**********************/

		get : function(index){
			return this.query[index];
		},
		eq : function(index){
			return $(this.query[index]);
		},
		index : function(selector){
			if(selector){
				var Query = $(selector);
				for(var i = 0; i < Query.length; i++){
					if(Query.get(i) === this.get(0)){
						return i;
					}
				}
				return -1;
			}else{
				var oParent = this.query[0].parentNode;
				var aSiblings = $(oParent).child();
				for(var i = 0; i < aSiblings.length; i++){
					if(aSiblings.get(i) === this.get(0)){
						return i;
					}
				}
				return -1;
			}
		},

		/**********************/

		first : function(){
				
		},
		last : function(){
			   
		},
		prev : function(){
			   
		},
		next : function(){
			   
		},
		siblings : function(){
				   
		},
		parent : function(){
				 
		},
		parents : function(){
				  
		},
		child : function(){
			var Query = this.query;
			var oTemp = $();
			oTemp.length = oTemp.query.length = 0;
			for(var i = 0; i < this.length; i++){
				var childrens = Query[i].childNodes;
				for(var j = 0; j < childrens.length; j++){
					childrens[j].nodeType === 1 && oTemp.query.push(childrens[j]);
				}
			}
			oTemp.length = oTemp.query.length;
			oTemp.selector = this.selector + ".child()";
			return oTemp;
		},
		find : function(selector){
			var Query = this.query;
			var oTemp = $();
			oTemp.length = oTemp.query.length = 0;
	
			if(selector){
				var posterity = $(selector).query;
				for(var i = 0; i < this.length; i++){
					for(var j = 0 ; j < posterity.length; j++){
						if($.isContains(Query[i],posterity[j])){
							oTemp.query.push(posterity[j]);
						}
					}
				}
			}else{
				for(var i = 0; i < this.length; i++){
					var posterity = Query[i].getElementsByTagName("*");
					oTemp.query = oTemp.query.concat($.toArray(posterity));
				}
			}
			oTemp.selector = this.selector + " find()";
			oTemp.length = oTemp.query.length;
			return oTemp;
		},

		/**********************/

		css : function(){
			var Query = this.query;
			if(arguments.length === 1){
				if(typeof arguments[0] === "string"){
				//get current style	
				}else if(typeof arguments[0] === "object"){
					for(var i = 0; i < this.length; i++){
						var cssText = "";
						for(var j in arguments[0]){
							cssText += j + ":" + arguments[0][j] + ";";
						}
						Query[i].style.cssText = cssText;
					}
				}
			}else if(arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string"){
				var cssText = arguments[0] + ":" + arguments[1];
				for(var i =0; i< this.length; i++){
					Query[i].style.cssText = cssText;
				}
			}
		},
		attr : function(){
			var Query = this.query;  
			if(arguments.length === 1){
				if(typeof arguments[0] === "string"){
					switch(arguments[0]){
						case "class":
							return Query[0].className;
						case "style":
							return Query[0].style.cssText.toLowerCase();
						default :
							return Query[0].getAttribute(arguments[0]);
					}
				}else if(typeof arguments[0] === "object"){
					for(var i in arguments[0]){
						this.attr(i,arguments[0][i]);
					}
				}
			}else if(arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string"){
				switch(arguments[0]){
					case "class":
						for(var i = 0; i < this.length; i++){
							Query[i].className = arguments[1];
						}
					case "style":
						for(var i = 0; i < this.length; i++){
							Query[i].style.cssText = arguments[1];
						}
					default :
						for(var i = 0; i < this.length; i++){
							Query[i].setAttribute(arguments[0],arguments[1]);
						}
				}
			}
		},

		removeAttr : function(attr){
			var Query = this.query;
			switch(attr){
				case "class":
					for(var i = 0; i < this.length; i++){
						Query[i].className = "";
					}
				case "style":
					for(var i = 0; i < this.length; i++){
						Query[i].style.cssText = "";
					}
				default :
					for(var i = 0; i < this.length; i++){
						Query[i].removeAttribute(attr);
					}
			}
		},

		addClass : function(className){
			var Query = this.query;
		 	for(var i = 0; i < this.length; i++){
				Query[i].className += " " + className;
			}	
		},

		removeClass : function(className){
			var Query = this.query;
			if(!className){
				for(var i = 0; i < this.length; i++){
					Query[i].className = "";
				}
			}else{
				className = className.replace(/\s+/g," ");
				var aClass = className.split(" ");
				for(var i = 0; i < aClass.length; i++){
					var pattern = new RegExp("( |^)" + aClass[i] + "( |$)");
					for(var j = 0; j < this.length; j++){
						var currentClass = Query[j].className;
						Query[j].className = currentClass.replace(pattern," ");
					}
				}
			}
		},

		/**********************/

		append : function(selector){
			var Query = this.query;
			if(typeof selector === "string"){
				for(var i = 0; i < this.length; i++){
					var oBuf = document.createElement("div");
					Query[i].appendChild(oBuf);
					oBuf.outerHTML = selector;
				}
			}else if($._ISCOBRA(selector)){
				$._APPEND(Query,selector.query);
				try{
					selector.removeNode(null,true);
				}catch(error){
					return false;
				}
			}
		},
		appendTo : function(selector){
			var Query = this.query;  
			$._APPEND(selector.query,Query);
			this.removeNode(null,true);
		},
		prepend : function(){
				  
		},
		prependTo : function(){
					
		},
		after : function(){
				
		},
		before : function(){
				 
		},
		insertAfter : function(){
					  
		},
		insertBefore : function(){
					   
		},
		replaceNode : function(selector){
			var Query = this.query;
			this.die();
			this.find().die();
			if(typeof selector === "string"){
				for(var i = 0; i < this.length; i++){
					Query[i].outerHTML = selector;
				}	
			}else if($._ISCOBRA(selector)){
				for(var i = 0; i < this.length; i++){
					var oFragment = document.createDocumentFragment();
					$(oFragment).append(selector.clone(true,true));
					Query[i].parentNode.replaceChild(oFragment,Query[i]);
				}
				selector.removeNode(null,true);
			}
		},

		removeNode : function(selector,embody){
			var Query = this.query;
			if(selector){
				selector = $._ISCOBRA(selector) ? selector : this.find(selector);
				selector.die();
				selector.find().die();
				for(var i = 0; i < selector.length; i++){
					selector.query[i].outerHTML = "";
				}
			}else if(!selector){
				this.find().die();
				embody && (this.die());
				for(var i = 0; i < this.length; i++){
					embody ? (Query[i].outerHTML = "") : (Query[i].innerHTML = "");
				}
				this.query = this.length = this.selector = null;
			}
		},
		clone : function(deep,keepevent){
			var Query = this.query;
			var oTemp = $();
			oTemp.length = oTemp.query.length = 0;
			oTemp.selector = this.selector;
			if(deep){
				if(keepevent){
					for(var i = 0; i < this.length; i++){
						var oNode = Query[i].cloneNode(true);
						var posterity = $(Query[i]).find().query;
						var clonePosterity = $(oNode).find().query;
						oNode.events = null;
						if(Query[i].events){
							for(var j in Query[i].events){
								if(Query[i].events[j]){
									for(var k in Query[i].events[j]){
										$(oNode).addEvent(j,Query[i].events[j][k]);
									}
								}
							}
						}
						for(var j = 0; j < posterity.length; j++){
							clonePosterity[j].events = null;
							if(posterity[j].events){
								for(var k in posterity[j].events){
									if(posterity[j].events[k]){
										for(var n in posterity[j].events[k]){
											$(clonePosterity[j]).addEvent(k,posterity[j].events[k][n]);
										}
									}
								}
							}
						}

						oTemp.query.push(oNode);
					}
				}else{
					for(var i = 0; i < this.length; i++){
						var oNode = Query[i].cloneNode(true);
						oNode.events = null;
						oTemp.query.push(oNode);
					}
				}
			}else{
				if(keepevent){
					for(var i = 0; i < this.length; i++){
						var oNode = Query[i].cloneNode(false);
						oNode.events = null;
						if(Query[i].events){
							for(var j in Query[i].events){
								if(Query[i].events[j]){
									for(var k in Query[i].events[j]){
										$(oNode).addEvent(j,Query[i].events[j][k]);
									}
								}
							}
						}
						oTemp.query.push(oNode);
					}
				}else{
					for(var i = 0; i < this.length; i++){
						var oNode = Query[i].cloneNode(false);
						oNode.events = null;
						oTemp.query.push(oNode);
					}
				}
			}
			oTemp.length = oTemp.query.length;
			return oTemp;
		},

		addEvent : function(type,fn){
			if(document.addEventListener){
				this.addEvent = function(type,fn){
					var Query = this.query;
					for(var i = 0; i < this.length; i++){
						$._EVENTCOUNT(fn,Query[i],type);
						Query[i].addEventListener(type,fn,false);
					}
				};
			}else{
				this.addEvent = function(type,fn){
					var Query = this.query;
					for(var i = 0; i < this.length; i++){
						$._EVENTCOUNT(fn,Query[i],type);
						Query[i]["on" + type] = function(){
							for(var i in this.events[type]){
								this.events[type][i].call(this);
							}
						}
					}
				};
			}
			return this.addEvent(type,fn);
		},
		delEvent : function(type,fn){
			var Query = this.query;
			if(document.removeEventListener){
				this.delEvent = function(type,fn){
					var Query = this.query;
					for(var i = 0; i < this.length; i++){
						Query[i].removeEventListener(type,fn,false);
						(Query[i].events && Query[i].events[type]) && (delete Query[i].events[type][fn._id]);
					}
				};
			}else{
				this.delEvent = function(type,fn){
					var Query = this.query;
					for(var i = 0; i < this.length; i++){
						(Query[i].events && Query[i].events[type]) && (delete Query[i].events[type][fn._id]);
					}
				};
			}
			return this.delEvent(type,fn);
		},

		//一次性解除事件绑定，未指定 type 则解除所有事件(通过 addEvent 方式绑定)
		die : function(type){
			var Query = this.query;
			for(var i = 0; i < this.length; i++){
				if(Query[i].events){
					if(type){
						for(var j in Query[i].events[type]){
							this.delEvent(type,Query[i].events[type][j]);
						}
						delete Query[i].events[type];
					}else{
						for(var j in Query[i].events){
							for(var k in Query[i].events[j]){
								this.delEvent(j,Query[i].events[j][k]);
							}
							delete Query[i].events[j];
						}
					}
				}
				if(type){
					Query[i]["on" + type] = null;
				}else{
					for(var j = 0 ; j < cobra._EVENTLIST.length; j++){
						Query[i][cobra._EVENTLIST[j]] = null;
					}
				}
			}
		},

		//页面 onload 事件
		ready : function(fn){
			if(this.selector === window || this.selector === document){
				$(window).addEvent("load",fn);
			}
		},

		//鼠标滚轮事件
		mouseWheel : function(fn){
			var roll = function(){
				var delta = 0;
				e = arguments[0] || window.event;
				delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
				fn(delta);
			};
			this.addEvent("mousewheel",roll);
			this.addEvent("DOMMouseScroll",roll);
		}
	};

	cobra._EVENTCOUNT = function(fn,obj,type){
		!cobra.count && (cobra.count = 0);
		typeof (fn._id) === "undefined" && (fn._id = cobra.count++);
		!obj.events && (obj.events = {});
		!obj.events[type] && (obj.events[type] = {});
		obj.events[type][fn._id] = fn;
	};

	cobra._EVENTLIST = (function(){
		var aTemp = [];
		for(var i in document){
			if(i.slice(0,2) === "on"){
				aTemp.push(i);
			}
		}
		return aTemp;
	}());

	cobra._APPEND = function(A,B){
		var lenA = A.length;
		var lenB = B.length;
		for(var i = 0; i < lenA; i++){
			var oFragment = document.createDocumentFragment();
			for(var j = 0; j < lenB; j++){
				oFragment.appendChild(   $(B[j]).clone(true,true).get(0)   );
			}
			A[i].appendChild(oFragment);
		}
	};

	cobra._ISCOBRA = function(obj){
		return (typeof obj === "object" && obj.constructor === cobra) ? true : false;
	};

	cobra.toArray = function(nodes){
		var aTemp = null;
		try{
			aTemp = Array.prototype.slice.call(nodes,0);
		}catch(error){
			aTemp = [];
			for(var i = 0; i < nodes.length; i++){
				aTemp.push(nodes[i]);
			}
		}
		return aTemp;
	};

	cobra.isContains = function(refNode,otherNode){
		if(refNode.contains){
			return refNode.contains(otherNode);
		}else if(typeof refNode.compareDocumentPosition){
			return !!(refNode.compareDocumentPosition(otherNode) & 16);
		}
	};

	cobra.include = function(src){
		//$(window).ready(function(){
			var oBody = document.body;
			var oHead = document.getElementsByTagName("head")[0];
			if(typeof src === "string"){
				var type = src.slice(src.lastIndexOf(".") + 1);
				switch(type){
					case "js":
						createNode("script",oBody,{
							type : "text/javascript",
							src : src
						});
						break;
					case "css":
						createNode("link",oHead,{
							type : "text/css",
							rel : "stylesheet",
							href : src
						});
						break;
				}
			}
			if(src instanceof Array){
				var oJsFragment = document.createDocumentFragment();
				var oCssFragment = document.createDocumentFragment();
				for(var i = 0; i < src.length; i++){
					var type = src[i].slice(src[i].lastIndexOf(".") + 1);
					switch(type){
						case "js":
							createNode("script",oJsFragment,{
								type : "text/javascript",
								src : src[i]
							});
							oJsFragment.count ? oJsFragment.count++ : oJsFragment.count = 1;
							break;
						case "css":
							createNode("link",oCssFragment,{
								type : "text/css",
								rel : "stylesheet",
								href : src[i]
							});
							oCssFragment.count ? oCssFragment.count++ : oCssFragment.count = 1;
							break;
					}
				}
				oJsFragment.count && oBody.appendChild(oJsFragment);
				oCssFragment.count && oHead.appendChild(oCssFragment);
			}
			function createNode(tag,oParent,attr){
				var oNode = document.createElement(tag);
				for(var i in attr){
					oNode[i] = attr[i];
				}
				oParent.appendChild(oNode);
			}
		//});
	};

	cobra.bind = function(fn,context){
		var _args = Array.prototype.slice.call(arguments,2);
		!cobra.count && (cobra.count = 0);
		typeof fn._id === "undefined" && (fn._id = cobra.count++);
		if(!context["bind_" + fn._id]){
			context["bind_" + fn._id] = function(){
				var innerArgs = Array.prototype.slice.call(arguments);
				var finalArgs = _args.concat(innerArgs);
				return fn.apply(context,finalArgs);
			}
		}
		return context['bind_' + fn._id];
	};

	cobra.unbind = function(fn,context){
		return context["bind_" + fn._id];
	};

	cobra.ajax = function(){

	};

	cobra.get = function(){
		
	};

	cobra.post = function(){
	
	};

	cobra.browser = function(){
	
	};

	cobra.trim = function(){
	
	};

	cobra.throttle = function(fn,context){
		clearTimeout(fn.tId);
		fn.tId = setTimeout(function(){
			fn.call(context);
		},100);
	};

	window.cobra = window.$ = cobra;	
}());



/*****************************************Test Code********************************************/
var a = $("#box");
var b = $("#list");
var c = $("#contains");
var item = $(".item");
var kk = $(".kkk");

a.addEvent("click",function(){
	alert("I am aaaaa");
})

b.addEvent("mouseover",function(){
	document.title = "1111111111111111";
});
b.addEvent("click",function(){
	alert("i am b");
});
c.addEvent("click",function(){
	alert("I am ccccc");
})
item.addEvent("click",function(){
	alert(this.innerHTML);
})
