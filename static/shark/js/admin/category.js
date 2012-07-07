$(document).ready(function(){
	var $onOff = $("#dir_tree .on_off");
	var $dirItem = $onOff.parent("span").siblings("ul");
	var $i = $("#dir_tree i[status]");
	var $check = $("#dir_tree input:checkbox")

	$("ul").each(function(){
		//if($(this).children("li").length > 1){
			$(this).children("li").last().has("ul").css("border-left-color","#fff")	
		//}
	})

	//读取cookie
	if(!$.cookie("dir_tree")){
		var $iStatus = [];
		$i.each(function(){
			$iStatus.push($(this).attr("status"));
		})
		$.cookie("dir_tree",$iStatus.join(":"));
	}
	else{
		var $iStatus = $.cookie("dir_tree").split(":");
		$.each($iStatus,function(i,n){
			if(n == 0){
				if($i.eq(i).hasClass("on_off")){
					$i.eq(i).removeClass("on").addClass("off");
					$i.eq(i).parent("span").parent("li").addClass("hide");
				}
				else if($i.eq(i).hasClass("icon")){
					$i.eq(i).removeClass("folder_on").addClass("folder_off");
				}
			}	
			else{
				if($i.eq(i).hasClass("on_off")){
					$i.eq(i).removeClass("off").addClass("on");
					$i.eq(i).parent("span").parent("li").removeClass("hide");
				}
				else if($i.eq(i).hasClass("icon")){
					$i.eq(i).removeClass("folder_off").addClass("folder_on");
				}
			}
		})
	}

	//折叠事件，并写入cookie
	$onOff.click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on").addClass("off");
			$(this).siblings(".icon").removeClass("folder_on").addClass("folder_off");
			$(this).parent("span").siblings("ul").css("display","none");
			$iStatus[$(this).index("#dir_tree i[status]")] = 0;
			$iStatus[$(this).siblings(".icon").index("#dir_tree i[status]")] = 0;
		}	
		else{
			$(this).removeClass("off").addClass("on");
			$(this).siblings(".icon").removeClass("folder_off").addClass("folder_on");
			$(this).parent("span").siblings("ul").css("display","block");
			$iStatus[$(this).index("#dir_tree i[status]")] = 1;
			$iStatus[$(this).siblings(".icon").index("#dir_tree i[status]")] = 1;
		}
		$.cookie("dir_tree",$iStatus.join(":"));
	})

	/*
	 *$("#check_all").toggle(
	 *    function(){
	 *        $("#dir_tree input[type='checkbox']").attr("checked","true");
	 *    },
	 *    function(){
	 *        $("#dir_tree input[type='checkbox']").removeAttr("checked")
	 *    }
	 *)
	 */

	$check.click(
		function(){
			if($(this).attr("checked")){
				console.log(1)	
			}
			else{
				console.log(0)	
			}
		}
	)

	var _add=$(".add_category"),
		_del=$(".del_category"),
		_edit=$(".edit_category");
	
	_add.live("click",function(){
		mb_pop({
			title:"添加子栏目",
			url:"category_add.html?action=add",
			type:"iframe",
			height:520,
			width:600,
			button:{
				disabled:false
			}
		},function(){
			parent.dialog_ok.click(function(){
				alert("添加栏目成功！");
				close_dialog();
			})
		})
	});
	
	/*_del.live("click",function(){
		var _cname=$(this).parents(".operate").siblings("span").find("a").text();
		mb_pop({
			title:"删除栏目："+_cname,
			data:"您确定要删除栏目："+_cname+"吗？",
			height:100,
			width:300,
			button:{
				disabled:false
			}	
		},function(){
			parent.dialog_ok.click(function(){
				alert("删除栏目！");
				close_dialog();
			})		
		})
	});*/
	
	_edit.live("click",function(){
		var _cname=$(this).parents(".operate").siblings("span").find("a").text();
		mb_pop({
			title:"编辑栏目："+_cname,
			url:"category_add.html?action=edit&cid=111",
			type:"iframe",
			height:520,
			width:600,
			button:{
				disabled:false
			}
		},function(){
			parent.dialog_ok.click(function(){
				alert("栏目："+_cname+"，修改成功！");
				close_dialog();
			})
		})
	});
})
