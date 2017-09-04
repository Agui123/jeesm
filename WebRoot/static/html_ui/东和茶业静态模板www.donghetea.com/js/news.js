jQuery(document).ready(function(){
	
	/*行情轮换*/
	$("#scrollDiv").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv1").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv2").Scroll({line:1,speed:500,timer:1000});
	$("#scrollDiv3").Scroll({line:1,speed:500,timer:2000});
	$("#scrollDiv4").Scroll({line:1,speed:500,timer:2000});
	
   /*资讯切换begin*/
	jQuery(".rec_news_title h2").hover(function(){
		jQuery(this).addClass("cur").siblings().removeClass("cur");
		recpindex = jQuery(this).index();
		jQuery(".rec_news_info").hide();
		jQuery(".rec_news_info").eq(recpindex).show();
		jQuery(".rec_news_title_more").hide();
		jQuery(".rec_news_title_more").eq(recpindex).show();
	})		
	/*资讯切换end*/
	
})