jQuery(document).ready(function(){
/*排序选择*/
 $('.list_mode_l dl').each(function(i){
  $(this).hover(function(){
	  $(this).addClass("hov_cur");
	  },function(){
	  $(this).removeClass("hov_cur");
	  }
	  )
  })

  /*价格*/
  $('.list_mode_m').hover(function(){
	  $(this).addClass("phov_cur");
	  },function(){
	  $(this).removeClass("phov_cur");
  })
 /*排序选择*/
 
  $('#reset_price').click(function(){
	  $('.price_min').val("");
	  $('.price_max').val("");
  })
  
	  
})