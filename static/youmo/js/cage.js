var youmo = {
	waterfall : {
		col : 4,
		gap : 10,
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
			for(var i = 0, len = item.length; i < len; i++){
				if((i + 1) % this.col === 0){
					
				}
			}

			//alert(item.length);
		},
		load : function(){
				   
		}		
	}
};
youmo.waterfall.init("waterfall");

