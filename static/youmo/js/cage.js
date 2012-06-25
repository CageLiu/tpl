var time = +new Date();
var youmo = {
	waterfall : {
		col : 4,
		gap : 10,
		cols : [],
		init : function(obj){
			this.water = typeof obj === "string" ? document.getElementById(obj) : obj;
			this.maxH = 0;
			var item = [];
			var temp = this.water.childNodes;
			var len = temp.length;
			while(len--){
				temp[len].nodeType === 1 && item.unshift(temp[len]);
			}
			for(var i = 0, len = item.length; i < len; i++){
				var oHtml = item[i];
				oHtml.h = oHtml.offsetHeight + this.gap;
				for(var j = 0; j < this.col; j++){
					if(i % this.col === j){
						!this.cols[j] && (this.cols[j] = {"items":[],"height":0});
						this.cols[j]["items"].push(item[i]);
						this.cols[j]['height'] += oHtml.h;
						this.maxH = Math.max(this.maxH,this.cols[j]["height"]);
						if(i && (i + 1) % 4 === 0 && i < len - 3){
							//console.log(this.maxH);
							for(var k = 1; k <= 4; k++){
								item[i + k].style.marginTop = this.cols[k - 1]["height"] - this.maxH + "px";
							}
						}
					}
				}
			}
		
			//console.log(item[0].offsetHeight + item[4].offsetHeight + 20);
			//console.log(this);
		},
		load : function(){
				   
		}		
	}
};
youmo.waterfall.init("waterfall");
console.log(+new Date() - time);
