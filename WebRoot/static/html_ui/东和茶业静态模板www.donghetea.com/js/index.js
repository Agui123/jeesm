jQuery(document).ready(function(){
	
	
	/*行情轮换*/
	$("#scrollDiv").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv1").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv2").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv3").Scroll({line:1,speed:500,timer:2000});
	$("#scrollDiv4").Scroll({line:1,speed:500,timer:2000});
	
   /*首页行情轮换begin*/
	jQuery(".Price_title h2").hover(function(){
		jQuery(this).addClass("cur").siblings().removeClass("cur");
		recpindex = jQuery(this).index();
		jQuery(".Price_info").hide();
		jQuery(".Price_info").eq(recpindex).show();
		jQuery(".read_more").hide();
		jQuery(".read_more").eq(recpindex).show();
	})		
	/*首页行情轮换end*/
	
	
/*首页推荐商品轮换begin*/
	jQuery(".Super_title h2").hover(function(){
		jQuery(this).addClass("cur").siblings().removeClass("cur");
		recpindex = jQuery(this).index();
		jQuery(".Super_info").hide();
		jQuery(".Super_info").eq(recpindex).show();
		jQuery(".super_more").hide();
		jQuery(".super_more").eq(recpindex).show();
	})		
	/*首页推荐商品轮换end*/
	
	/*茶通专区轮换begin*/
	jQuery(".Chatong_title h2").hover(function(){
		jQuery(this).addClass("cur").siblings().removeClass("cur");
		recpindex = jQuery(this).index();
		jQuery(".Chatong_info").hide();
		jQuery(".Chatong_info").eq(recpindex).show();
		jQuery(".Chatong_more").hide();
		jQuery(".Chatong_more").eq(recpindex).show();
	})		
	/*茶通专区轮换end*

   
   
    /*经纪人左右切换begin*/
    $("#brokerid").append('<a class="ldisable"></a>');
	$("#brokerid").append('<a class="rdisable"></a>');
	$("#brokerid").find(".pre").hide().siblings(".rdisable").hide();//初始化为第一版
	var page=1;//初始化当前的版面为1
	var $show=$("#brokerid").find(".broker_box");//找到图片展示区域
	var page_count=$show.find("ul").length;
	var $width_box=$show.parents("#wai_box").width();//找到图片展示区域外围的div
  
	function nav(){
		if(page==1){
			$("#brokerid").find(".pre").hide().siblings(".next").show().siblings(".ldisable").show().siblings(".rdisable").hide();
		}else if(page==page_count){
			$("#brokerid").find(".next").hide().siblings(".pre").show().siblings(".ldisable").hide().siblings(".rdisable").show();
		}else{
			$("#brokerid").find(".pre").show().siblings(".ldisable").hide().siblings(".next").show().siblings(".rdisable").hide();
		}
	}
	$("#brokerid").find(".next").click(function(){
		//首先判断展示区域是否处于动画
		if(!$show.is(":animated")){
			$show.animate({left:'-='+$width_box},"slow");
			page++;
			nav();
			return false;
		}
	})
	$("#brokerid").find(".pre").click(function(){
	if(!$show.is(":animated")){
		$show.animate({left:'+='+$width_box},"slow");
		page--;
		nav();
		}
		return false;
	})
	
	/*自动播放*/
	var picTimer;
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$show.hover(function(){
		clearInterval(picTimer);
	},function(){
	  picTimer = setInterval(function(){ 
			  if(page == page_count)
			  {
				$show.css('left',0);
				page=1;
				nav();   
			  }
			  else
			  { 
				 $show.animate({left:'-='+$width_box},"slow");
				 page++;
				 nav();
			  } 
	  },10000); //此3000代表自动播放的间隔，单位：毫秒
			
		
	}).trigger("mouseleave");
	/*经纪人左右切换end*/
})
