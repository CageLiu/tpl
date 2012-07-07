window.onload=function(){
	showPop();
	hidePop();
}
function showPop(){
	var table=document.getElementById("table");
	pop=document.getElementById("pop");
	divmask=document.getElementById("divmask");
	var revise=table.getElementsByTagName("a");
	for (var i=0;i<revise.length;i++){
		revise[i].onclick=function(){
			if(this.className=="revise"){
				pop.style.display="block";
				divmask.style.display = "block";
				document.body.style.overflow = "hidden";
				
			}
		}
	}
}
function hidePop(){
	var pop_close=document.getElementById("pop_close");
	pop_close.onclick=function(){
		pop.style.display="";
		divmask.style.display = "";
		document.body.style.overflow = "auto";
	}
}




