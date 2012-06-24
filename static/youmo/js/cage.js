var youmo = {
	waterfall : {
		col : 4,
		column : function(){
			this.items  = [];
			this.heightCount = 0;
		},
		init : function(obj){
			this.water = typeof obj === "string" ? document.getElementById(obj) : obj;
			var item = [];
			var temp = this.water.childNodes;
			var len = temp.length;
			while(len--){
				temp[len].nodeType === 1 && item.unshift(temp[len]);
			}
			for(len = item.length - 1; len >= 0; len--){
				console.log(len);
			}

			//alert(item.length);
		},
		load : function(){
				   
		}		
	}
};
youmo.waterfall.init("waterfall");
