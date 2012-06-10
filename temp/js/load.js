$(document).ready(
	function()
	{
		var user_name = new Array(); 
		var keys = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
		var sum = new Array();
		var css_href;
		var css_reset;
		var wrap_width;
		var timer;
		$("<div id='moudle_buffer' class='buffer'><ul></ul></div>").appendTo("body");
		$("<div id='buffer' style='display:none' class='buffer'></div>").appendTo("body");
		
		version = "?version=" + parseInt(Math.random()*100)/100
		
		$("#buffer").load("config.html",
			function()
			{
				css_href = $.trim($("#css_href").text());
				css_reset = $.trim($("#reset_css").text());
				wrap_width = $.trim($("#wrap_width").text());
				$("<link id='css' type='text/css' rel='stylesheet' href='' />").appendTo("head");
				$("#css").attr("href",css_href+css_reset+".css" + version);
				$("#moudle_wrap").css("width",wrap_width);
				$("#user li").each(
					function(n)
					{
						var $name = $.trim($(this).text());
						user_name[n] = $name;
						$("<link id='css_"+ n + "' type='text/css' rel='stylesheet' href='' />").appendTo("head");
						$("#css_"+n).attr("href",css_href+$name+".css" + version);
					}
				);
			}
		);
		
		setTimeout(load_moudle,100);
		
		function load_moudle()
		{
			$(".moudle_nav,#moudle_wrap").css("display","none");
			$.each(user_name,
				function(i,n)
				{	
					$("#right_moudle_nav ul").load(n+".html .moudle_nav li",
					function()
					{
						$("#right_moudle_nav span:contains('Default')").parents("li").remove();
						sum[i] = parseInt($("#right_moudle_nav li").length-1);
						$("#right_moudle_nav li").appendTo("#left_moudle_nav ul");
					}); 
					$("#moudle_buffer ul").load(n+".html #moudle_list li.moudle_item",
					function()
					{
						if(sum[i] >= 0)
						{
							$("#moudle_buffer li.moudle_item:gt("+sum[i]+")").remove();
							$("<em>Author："+n+"</em>").appendTo("#moudle_buffer .moudle_title");
						}
						else{$("#moudle_buffer li.moudle_item").remove();}
						$("#moudle_buffer li.moudle_item").appendTo("#moudle_list");
					});
				}
			);
		}
		
		timer = setTimeout(adjus,5000);
		function adjus()
		{
			$(".buffer").remove(); 
			$(".moudle_title span.moudle_number").remove();      
			$("#left_moudle_nav li:gt(0)").removeAttr("class");
			$.each(keys,
			function(i,n)
			{
				var a = i+1;
				if(i < $("#left_moudle_nav li").length)
				{
					$("#left_moudle_nav li span").eq(i).attr("class","moudle_type"+a);
					$("#left_moudle_nav li em").eq(i).text(n+".");
					$("#left_moudle_nav li a").eq(i).attr("href","#moudle"+a);
					$("#moudle_list li.moudle_item").eq(i).attr("id","moudle"+a).find(".moudle_title").children("span").attr("class","moudle_type"+" "+"moudle_type"+a).text($("#left_moudle_nav li span").eq(i).text());
				}
				$.hotkeys.add(n,
				function()
				{
					var item = i+1;
					var cname = "moudle_type"+item;
					if(i<$(".moudle_nav li").length)
					{
						window.location = "#moudle"+item;
						$(window).scrollTop(0);
						$("#html_code_box").fadeOut(10);
						$(".moudle_nav li").removeClass();
						$(".moudle_nav li").eq(i).addClass("current");
						$("span.moudle_type").each(
						function()
						{
							if($(this).hasClass(cname)){addStyle($(this));}
							else{removeStyle($(this));}
						});
					}
				});
			});
			setTimeout(show_con,2000);			
			function show_con()
			{
				$("body").removeClass();
				if($("#left_moudle_nav li").length ==0)
				{
					$("body").addClass("null");
				}
				else if($("#left_moudle_nav li").length <= 13)
				{
					$("#left_moudle_nav").css("display","block");
					$("#right_moudle_nav").css("display","none");
				}
				else
				{	
					$(".moudle_nav").css("display","block");
					$("#left_moudle_nav li:gt(12)").appendTo("#right_moudle_nav ul");
				}
				setTimeout(function(){
				$("#moudle_wrap").css("display","block");},500)
			}
			$(".moudle_title").each(
			function()
			{
				if($(this).find("span.moudle_type").hasClass($(".moudle_nav li.current").find("span").attr("class"))){$(this).addClass("highlight");}
				else{$(this).removeClass("highlight");}
			});
			$(".moudle_nav li").click(
			function()
			{
				var $nav = $(this);
				$("span.moudle_type").each(
					function()
					{
						if($(this).hasClass($nav.find("span").attr("class")))
						{addStyle($(this));}
						else{removeStyle($(this));}
					}
				);
				$("#html_code_box").fadeOut(10);
				$(".moudle_nav li").removeClass();
				$nav.addClass("current");
			}); 
			$(".moudle_title").click(
			function()
			{
				$("#html_code_box").fadeIn("slow");
				$("#moudle_type").text($(this).children("span.moudle_type").text());
				$("#moudle_code").val($(this).next(".moudle_con").html());
				$("#moudle_code").focus().select();
			}); 
		}
		if($.browser.msie)
		{
			if ($.browser.version == "6.0")
			{
				$("#html_code_box").css("height",$(window).height()*0.9);
				$("#moudle_code").css("height",$("#html_code_box").height()*0.9);
				$(window).scroll(
				function()
				{
					var scrollTop = $(window).scrollTop()+$(window).height()*0.02;
					$(".moudle_nav,#html_code_box").css("top",scrollTop);						
				});
			}
		}
		$("#close_moudle").click(
			function()
			{$("#html_code_box").fadeOut("slow");}); 
		$("#moudle_code").mouseover(
			function()
			{
				if($("#html_code_box").css("display") != "none")
				{$(this).focus().select();}
			});
		$.hotkeys.add("f5",
			function()
			{location.reload();window.location = "#";}); 
		$.hotkeys.add("esc",
			function()
			{$("#html_code_box").fadeOut("slow");});
		function addStyle(obj)
		{
			obj.parent(".moudle_title").addClass("highlight");
			obj.parents("li.moudle_item").css("display","block");
		} 
		function removeStyle(obj)
		{
			obj.parent(".moudle_title").removeClass("highlight");
			obj.parents("li.moudle_item").css("display","none");
		}
	});
