$(document).ready(
	function()
	{	
		$("<div id='buffer' style='display:none' class='buffer'></div>").appendTo("body");
		version = "?version=" + parseInt(Math.random()*100)/100
		$("#buffer").load("config.html",
			function()
			{
				var css_href = $.trim($("#css_href").text());
				var css_reset = $.trim($("#reset_css").text());
				var wrap_width = $.trim($("#wrap_width").text());
				$("<link id='css' type='text/css' href='' rel='stylesheet' />").appendTo("head");
				$("#css").attr("href",css_href+css_reset+".css" + version);
				$("#moudle_wrap").css("width",wrap_width);
				$("#user li").each(
					function(i)
					{
						var $name = $.trim($(this).text());
						$("<link id='css_"+ i + "' type='text/css' rel='stylesheet' href='' />").appendTo("head");
						$("#css_"+i).attr("href",css_href+$name+".css" + version);
					}
				);
			}
		);
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
		$("span.moudle_type").each(
			function()
			{
				var $title = $(this);
				$title.addClass(
					"moudle_type"+parseInt($title.parents("li.moudle_item").index()+1)
				);
				$(".moudle_nav span").each(
				function()
				{
					if($title.hasClass($(this).attr("class")))
					{$title.text($(this).text());}
				});
			}
		);
		
		$("span:contains('Default')").parents("li").css("display","none");
		if($(".moudle_nav span:contains('Default')").length ==26){$("body").addClass("null");}
		
		$(".moudle_title").each(
			function()
			{
				var $text = $(this).find("input.text");
				var $value = $(this).find("span.moudle_number").text();
				if($text.length<1)
				{$(this).append('<input type="text" class="text" value=""/>');}
				if($(this).find("span.moudle_type").hasClass($(".moudle_nav li.current").find("span").attr("class")))
				{$(this).addClass("highlight");}
				else{$(this).removeClass("highlight");}
			}
		);
		
		$(".moudle_nav li").click(
		function()
		{
			if(!$(this).hasClass("disabled"))
			{var $nav = $(this);
			$("span.moudle_type").each(
				function()
				{
					if($(this).hasClass($nav.find("span").attr("class"))){addStyle($(this));}
					else{removeStyle($(this));}
				});
			$("#html_code_box").fadeOut(10);
			$(".moudle_nav li").removeClass();
			$(this).addClass("current");
			}
		});
		$(".moudle_title").click(
		function()
		{
			$("#html_code_box").fadeIn("slow");
			$("#moudle_type").text($(this).children("span.moudle_type").text());
			$("#moudle_number").text($(this).children("span.moudle_number").text());
			$("#moudle_code").val($(this).next(".moudle_con").html());
			$("#moudle_code").focus().select();
		});
		
		$(".moudle_title").hover(
		function()
		{
			$(this).find("input.text").css("display","block").val($(this).find("span.moudle_number").text());
			$(this).find("input.text").focus().select();
		},
		function()
		{$(this).find("input.text").css("display","none");});
		
		$("#close_moudle").click(
		function()
		{$("#html_code_box").fadeOut("slow");});
		
		$("#moudle_code").mouseover(
		function()
		{if($("#html_code_box").css("display") != "none"){$(this).focus().select();}});
		
		$.hotkeys.add("esc",
		function()
		{$("#html_code_box").fadeOut("slow");}); 
		
		var num = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
		$.each(num,
		function(i,n)
		{
			$.hotkeys.add(n,
			function()
			{
				var item = i+1;
				var cname = "moudle_type"+item;
				window.location = "#moudle"+item;
				$("#html_code_box").fadeOut(10);
				$(".moudle_nav li").removeClass();
				$(".moudle_nav li").eq(i).addClass("current");
				$("span.moudle_type").each(
				function()
				{
					if($(this).hasClass(cname)){addStyle($(this));}
					else{removeStyle($(this));}
				});
			});
		});
		$.hotkeys.add("f5",
		function()
		{
			location.reload();
			window.location = "#";
		}); 
		$("span.mhelp_button").click(
		function()
		{$(this).parents(".moudle_help").fadeOut("slow");});

		function addStyle(obj)
		{
			obj.parent(".moudle_title").addClass("highlight");
			obj.parents("li.moudle_item").css("display","block");
		}    /* 高亮显示 */
		
		function removeStyle(obj)
		{
			obj.parent(".moudle_title").removeClass("highlight");
			obj.parents("li.moudle_item").css("display","none");
		}    /* 移除高亮 */
	});













