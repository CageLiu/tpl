var monkey = {
	C : function(){},
	D : {},
	M : {},
	O : {},
	rSpace : /\s/,
	windowWidth : document.documentElement.clientWidth,
	windowHeight : document.documentElement.clientHeight
};
var $$ = monkey;

(function(){
	monkey.C = function(baseClass,proto){
		monkey.C.initializing = false; 
		if(typeof(baseClass) === "object"){
			proto = baseClass;
			baseClass = null;
		}
		function F(){
			if(!monkey.C.initializing){
				this.init.apply(this,arguments);
			}
		}
		if(baseClass){
			monkey.C.initializing = true;
			F.prototype = new baseClass();
			F.prototype.constructor = F;
			monkey.C.initializing = false;
		}

		for(var name in proto){
			if(!proto.hasOwnProperty(name)) continue;
			if (baseClass && typeof (proto[name]) === "function" && typeof (F.prototype[name]) === "function"){
				F.prototype[name] = (function(name,fn){
					return function(){
						this.base = baseClass.prototype[name];
						return fn.apply(this,arguments);
					}
				})(name,proto[name]);
			}
			else{
				F.prototype[name] = proto[name];
			}
		}
		return F;
	};
	monkey.D.$ = function(selector){
		return typeof(selector) === "string" ? document.getElementById(selector) : selector;
	};
	monkey.M.addEvent = function(obj,type,fn){
		if (obj.attachEvent){
			obj['e' + type + fn ] = fn;
			obj[type + fn] = function(){
				obj['e' + type + fn](window.event);
			};
			obj.attachEvent("on" + type,obj[type + fn]);
		}
		else {
			obj.addEventListener (type,fn,false);
		}
	};
	monkey.M.removeEvent = function(obj,type,fn){
		if (obj.detachEvent){
			obj.detachEvent("on" + type,obj[type + fn]);
			obj[type + fn] = null;
		}
		else{
			obj.removeEventListener (type,fn,false);
		}
	};
	monkey.M.bind = function(obj,fn){
		return function(){
			return fn.apply(obj,arguments);
		}
	};
	monkey.M.css = function(obj,attr){
		var aTemp = [];
		obj = monkey.D.$(obj);
		if(attr.indexOf("-") > -1 && obj.currentStyle){
			aTemp = attr.split("-");
			for(var i = 1; i < aTemp.length; i++){
				aTemp[i] = aTemp[i].substring(0,1).toUpperCase() + aTemp[i].substring(1);
			}
			attr = aTemp.join("");
		}
		if(obj.style[attr]){
			return obj.style[attr];
		}else if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else if(document.defaultView && document.defaultView.getComputedStyle){
			var s = document.defaultView.getComputedStyle(obj,"");
			return s && s.getPropertyValue(attr);
		}else{
			return null;
		}
	};
	monkey.M._forSize = function(obj){
		var obj = monkey.D.$(obj);
		var oBody = document.body;
		var objCopy = null;
		if(monkey.M.css(obj,"display") == "none"){
			objCopy = obj.cloneNode(true);
			objCopy.style.position = "absolute";
			objCopy.style.left = "-9999em";
			objCopy.style.top = "-9999em";
			objCopy.style.display = "block";
			objCopy.style.visibility = "hidden";
			oBody.appendChild(objCopy);
		}
		return objCopy;
	};
	monkey.M.innerWidth = function(obj){
		var objCopy = monkey.M._forSize(obj);
		var W;
		obj = objCopy || monkey.D.$(obj);
		W = obj.clientWidth;
		if(objCopy){
			objCopy.parentNode.removeChild(objCopy);
		}
		return parseInt(W);
	};
	monkey.M.innerHeight = function(obj){
		var objCopy = monkey.M._forSize(obj);
		var H;
		obj = objCopy || monkey.D.$(obj);
		H = obj.clientHeight;
		if(objCopy){
			objCopy.parentNode.removeChild(objCopy);
		}
		return parseInt(H);
	};
	monkey.M.outerWidth = function(obj){
		var objCopy = monkey.M._forSize(obj);
		var W;
		obj = objCopy || monkey.D.$(obj);
		W = obj.offsetWidth;
		if(objCopy){
			objCopy.parentNode.removeChild(objCopy);
		}
		return parseInt(W);
	};
	monkey.M.outerHeight = function(obj){
		var objCopy = monkey.M._forSize(obj);
		var H;
		obj = objCopy || monkey.D.$(obj);
		H = obj.offsetHeight;
		if(objCopy){
			objCopy.parentNode.removeChild(objCopy);
		}
		return parseInt(H);
	};
	monkey.O.scrollbar = monkey.C({
		init : function(slider,cont,options){
			var _this = this;
			this.slider = monkey.D.$(slider);
			this.bar = this.slider.parentNode;
			this.box = this.bar.parentNode;
			this.cont = monkey.D.$(cont);
			this.cont.Width = monkey.M.outerWidth(this.cont);
			this.cont.Height = monkey.M.outerHeight(this.cont);
			this.slider.style.top = "0px";
			this.setOptions.call(this,options);
			this.reSet.apply(this,arguments);
			this._doDrag = monkey.M.bind(this,this.doDrag);
			this._stopDrag = monkey.M.bind(this,this.stopDrag);
			monkey.M.addEvent(window,"resize",monkey.M.bind(this,this.reSet));
			monkey.M.addEvent(this.slider,"mousedown",monkey.M.bind(this,this.startDrag));
		},
		setOptions : function(options){
			this.options = {
				dire : 'y',
				startCallBack : null,
				dragCallBack : null,
				stopCallBack : null
			};
			for(var item in options){
				if(!options.hasOwnProperty(item)) continue;
				this.options[item] = options[item];
			}
		},
		reSet : function(e){
			e = e || event;
			this.slider.Width = monkey.M.innerWidth(this.box) * monkey.M.innerWidth(this.box) / this.cont.Width;
			this.slider.Height = monkey.M.innerHeight(this.box) * monkey.M.innerHeight(this.box) / this.cont.Height;
			if(this.options.dire == "y"){
				if(this.box.offsetHeight <= this.cont.Height){
					if(this.slider.Height > 30){
						this.slider.style.height = this.slider.Height + "px";
					}else{
						this.slider.style.height = "30px";
					}
				}else{
					this.slider.style.height = monkey.M.innerHeight(this.bar) -1 + "px";
				}
			}else if(this.options.dire == "x"){
				this.bar.style.width = monkey.M.innerWidth(this.box) - 10 + "px";
				if(monkey.M.innerWidth(this.box) <= this.cont.Width){
					if(this.slider.Width > 30){
						this.slider.style.width = this.slider.Width + "px";
					}else{
						this.slider.style.width = "30px";
					}
				}else{
					this.slider.style.width = monkey.M.innerWidth(this.bar) -1 + "px";
				}
			}
		},
		startDrag : function(e){
			e = e || event;
			this.startX = e.clientX;
			this.startY = e.clientY;
			this.startLeft = this.slider.offsetLeft;
			this.startTop = this.slider.offsetTop;
			if(this.slider.setCapture){
				monkey.M.addEvent(this.slider,"mousemove",this._doDrag);
				monkey.M.addEvent(this.slider,"mouseup",this._stopDrag);
				this.slider.setCapture();
			}else{
				monkey.M.addEvent(document,"mousemove",this._doDrag);
				monkey.M.addEvent(document,"mouseup",this._stopDrag);
			}
		},
		doDrag : function(e){

		},
		stopDrag : function(){
			if(this.slider.releaseCapture){
				monkey.M.removeEvent(this.slider,"mousemove",this._doDrag);
				monkey.M.removeEvent(this.slider,"mouseup",this._stopDrag);
				this.slider.releaseCapture();
			}else{
				monkey.M.removeEvent(document,"mousemove",this._doDrag);
				monkey.M.removeEvent(document,"mouseup",this._stopDrag);
			}
		}
	});
	monkey.O.ajax = monkey.C({
		init : function(){
			   
		}
	});
	monkey.O.dialog = monkey.C({
		init : function(handler,dialog){
			this.handler = monkey.D.$(handler);
			this.dialog = monkey.D.$(dialog);
			this.layer = this.dialog.parentNode;
			this.closebtn = this.dialog.getElementsByTagName("span")[0];
			monkey.M.addEvent(this.handler,"click",monkey.M.bind(this,this.show));
			monkey.M.addEvent(this.closebtn,"click",monkey.M.bind(this,this.hide));
		},
		show : function(){
			this.layer.style.display = "block";
		},
		hide : function(){
			this.layer.style.display = "none";
		}
	});
})();

