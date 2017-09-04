
/* *
 * 添加商品到收藏夹
 */
function collect(goodsId)
{
  Ajax.call(shop_url+'user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
}

/* *
 * 处理关注商品的反馈信息
 */
function collectResponse(result)
{

  if (result.error == 1)
  {
	if(confirm(result.message))
	{
		if(result.login == 1)
		{
		location.href = shop_url+'user.php?act=login';
		}
	}
  }
  else if (result.error == 2)
  {
    alert(result.message);
  }

}

/* *
 * 添加文章到收藏夹
 */
function collectarticle(articleId)
{
  Ajax.call(shop_url+'user.php?act=collectarticle', 'id=' + articleId, collectarticleResponse, 'GET', 'JSON');
}

/* *
 * 处理添加文章的反馈信息
 */
function collectarticleResponse(result)
{

  if (result.error == 1)
  {
	if(confirm(result.message))
	{
		if(result.login == 1)
		{
		location.href = shop_url+'user.php?act=login';
		}
	}
  }
  else if (result.error == 2)
  {
    alert(result.message);
  }

}

function display_mode(str)
{
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() {document.forms['listform'].submit();}
}

	/**
 * 提交评论信息
*/
function submitComment(frm)
{
  var cmt = new Object;
  
  cmt.username         = frm.elements['username'].value;
  cmt.content         = frm.elements['content'].value;
  cmt.type            = frm.elements['cmt_type'].value;
  cmt.id              = frm.elements['id'].value;
  cmt.enabled_captcha = frm.elements['enabled_captcha'] ? frm.elements['enabled_captcha'].value : '0';
  cmt.captcha         = frm.elements['captcha'] ? frm.elements['captcha'].value : '';
  cmt.rank            = 0;

  for (i = 0; i < frm.elements['comment_rank'].length; i++)
  {
    if (frm.elements['comment_rank'][i].checked)
    {
       cmt.rank = frm.elements['comment_rank'][i].value;
     }
  }
  
   if (cmt.content.length == 0 || cmt.content=='注：所有评论通过审核后才会被公开')
   {
      alert(cmt_empty_content);
      return false;
   }

   if (cmt.enabled_captcha > 0 && cmt.captcha.length == 0 )
   {
      alert(captcha_not_null);
      return false;
   }
   if(cmt.type == 7)
   {
  	 	Ajax.call(shop_url+'comment.php', 'cmt=' +  $.toJSON(cmt), consultativeResponse, 'POST', 'JSON');
   }else{
   		Ajax.call(shop_url+'comment.php', 'cmt=' +  $.toJSON(cmt), commentResponse, 'POST', 'JSON');
   }
   return false;
}

/**
 * 处理提交评论的反馈信息
*/
  function commentResponse(result)
  {
    if (result.message)
    {
      //alert(result.message);
	  if(result.typesss==2)
	  {
	     openDiv_message(result.message,'发表成功！','contentkey');
	  }
	  else
	  {
		  alert(result.message);
	  }
    }

    if (result.error == 0)
    {
      var layer = document.getElementById('ECS_COMMENT');

      if (layer)
      {
        //layer.innerHTML = result.content;
      }
    }
  }
  

  
  function consultativeResponse(result)
  {
    if (result.message)
    {
      alert(result.message);
    }

    if (result.error == 0)
    {
      var layer = document.getElementById('ECS_CONSULATIVE');

      if (layer)
      {
        //layer.innerHTML = result.content;
      }
    }
  }

  /* *
 * 添加回复
 */
function addreplay(comment_id,ids,ctype,cid,uid,ips)
{
	var messages= $("#recontent"+comment_id+cid).val();
	if(messages.length ==0)
	{
		alert("请输入回复内容！");
		return false;
	}
	else if(messages.length < 3)
	{
		alert("回复内容太短！");
		return false;
	}
	else
	{
	   Ajax.call(shop_url+'user.php?act=addreplay', 'id=' + comment_id + '&type=' + ctype + '&content=' + messages+ '&ids=' + ids+ '&uid=' + uid+ '&ips=' + ips+ '&cid=' + cid, addreplayResponse, 'GET', 'JSON');
	}
}
/* *
 * 添加回复反馈信息
 */
function addreplayResponse(result)
{

  if (result.error == 1)
  {
	  alert(result.message);
  }
  else if (result.error == 3)
  {
	  $('#recon'+result.comment_id).hide();
	 // openDiv_message(message,titles,ids)
	 openDiv_message(result.message,'回复成功！','recontent'+result.comment_id+result.cid);
	//alert(result.comment_id);
  }
  else
  {
	  document.getElementById('recomment_'+result.comment_id).innerHTML =result.re_number;
  }
}
  
  
  /* *
 * 添加喜欢商品
 */
function addagree(comment_id,isagree)
{
	Ajax.call(shop_url+'user.php?act=addagree', 'id=' + comment_id + '&isagree=' + isagree, addagreeResponse, 'GET', 'JSON');
}
/* *
 * 处理喜欢商品反馈信息
 */
function addagreeResponse(result)
{
  if (result.error == 1)
  {
	  alert(result.message);
  }
  else
  {
	  document.getElementById('comment_un'+result.comment_id).innerHTML =result.unagree_number;
	  document.getElementById('comment_'+result.comment_id).innerHTML =result.agree_number;
  }
}

/* *
 * 评论的翻页函数
 */
function gotoPage(page, id, type, grade)
{
  Ajax.call(shop_url+'comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type+ '&grade=' + grade, gotoPageResponse, 'GET', 'JSON');
}

function gotoPageResponse(result)
{
  document.getElementById("ECS_COMMENT").innerHTML = result.content;
}



jQuery(document).ready(function(){

   /*置顶*/
	 var $backToTopTxt = "", $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
     }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);    
        }
     };
     $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });
	 /*置顶*/
	 
	/*弹出分类*/
	$(".icategory_tree .show_area").hover(function(){
		 $(this).addClass("selected");
	   },function(){
		 $(this).removeClass("selected");
	 })
	 /*弹出分类end*/

   /*浮动QQ begin*/
	$("#floatShow").bind("click",function(){
	
		$("#onlineService").animate({width:"show", opacity:"show"}, "normal" ,function(){
			$("#onlineService").show();
		});
		
		$("#floatShow").attr("style","display:none");
		$("#floatHide").attr("style","display:block");
		
		return false;
	});
	
	$("#floatHide").bind("click",function(){
	
		$("#onlineService").animate({width:"hide", opacity:"hide"}, "normal" ,function(){
			$("#onlineService").hide();
		});
		
		$("#floatShow").attr("style","display:block");
		$("#floatHide").attr("style","display:none");
		
		return false;
	});
	/*浮动QQ end*/
	
	/*销售排行点击切换 begin*/
   jQuery(".top_tab ul li").hover(function() {
	  index = jQuery(this).parent().children("li").index(this);
	  jQuery(this).parent().children("li").siblings().removeClass("selected").eq(index).addClass("selected");
   })
   /*销售排行点击切换 end*/
   
   /*按下评论 begin*/
	jQuery("#contentkey").css("color", "#999").live("focus",function(){
		jQuery(this).val("").css("color", "#000");
	})

	
	/*搜索关键词 begin*/
	jQuery("#keyword").css("color", "#ccc").bind("focus",function(){
		jQuery(this).val("").css("color", "#000");
	})
	
	jQuery("#kseyword").css("color", "#ccc").bind("focus",function(){
		jQuery(this).val("").css("color", "#000");
	})

	/*搜索关键词 end*/
	
	/*顶部个人中心tab begin*/
   jQuery(".user_acount").hover(function(){
	  jQuery(this).addClass("hov_acount");
	  },function(){
	  jQuery(this).removeClass("hov_acount");
	})
	  /*顶部个人中心tab begin*/
	  
	 /*全站公用tab*/
	 jQuery(".tabline h2").click(function(){
		tabindex = jQuery(this).index();
		jQuery(this).addClass("h2bg").siblings().removeClass("h2bg");
		jQuery(".tab-box blockquote").eq(tabindex).show().siblings().hide();
		
	 })
	 
	 /*搜索框切换特效*/
	 jQuery(".search_title h2").click(function(){
	    jQuery(this).addClass("cur").siblings().removeClass("cur");
		var att_val = jQuery(this).attr('data');
		if(att_val==33 || att_val==36)
		{
		  $("#formsearchid").attr("action",shop_url+"search.php");
		  jQuery("#type_Id").attr({"id":"Category_Id","name":"category"});
		  jQuery("#Category_Id").val(att_val);
		}
		else
		{
		  $("#formsearchid").attr("action",shop_url+"supply.php");
		  jQuery("#Category_Id").attr({"id":"type_Id","name":"type","value":att_val});
		  jQuery("#type_Id").val(att_val);
		}
		jQuery(".searchbar .keys").hide().eq($(this).index()).show();
	 })
	 
	 /*显示回复按钮begin*/
	 $(".item-reply").live("mouseenter", function () {
		jQuery(this).find(".btn-toggle").css('visibility','visible');
	  });
	  
	  $(".item-reply").live("mouseleave", function () {
		  if($(this).find(".replay-form").is(":visible"))
		  {
			jQuery(this).find(".btn-toggle").css('visibility','visible'); 
		  }
		  else
		  {
			jQuery(this).find(".btn-toggle").css('visibility','hidden');
		  }
	  });
      /*显示回复按钮end*/
	  
	  /*显示回复框框*/
	  $(".btn-toggle").live("click", function () {
	     $(this).toggle(function () {
			 $(this).parent().parent().find(".replay-form").show();
		 },function (){
			$(this).parent().parent().find(".replay-form").hide();
		 }).trigger('click');
	  });
})


//检测层是否已经存在  
function docEle()
{
  return document.getElementById(arguments[0]) || false;
}
  /* *
 * 点击评论提交成功提示层
* 参数 message：提示信息
 */function openDiv_message(message,titles,ids)
{
  var _id = "speDiv";
  var m = "mask";
  if (docEle(_id)) document.removeChild(docEle(_id));
  if (docEle(m)) document.removeChild(docEle(m));
  //计算上卷元素值
  var scrollPos;
  if (typeof window.pageYOffset != 'undefined')
  {
    scrollPos = window.pageYOffset;
  }
  else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')
  {
    scrollPos = document.documentElement.scrollTop;
  }
  else if (typeof document.body != 'undefined')
  {
    scrollPos = document.body.scrollTop;
  }

  // 新激活图层
  var newDiv = document.createElement("div");
  newDiv.id = _id;
  newDiv.className= 'cartBox';
  newDiv.style.position = "absolute";
  newDiv.style.zIndex = "10000";
  newDiv.style.width = "300px";
  newDiv.style.height = "118px";
  newDiv.style.top = (parseInt(scrollPos + 250)) + "px";
  newDiv.style.left = (parseInt(document.body.offsetWidth) - 125) / 2 + "px"; // 屏幕居中
  newDiv.style.overflow = "auto";
  newDiv.style.padding = "5px";

  //生成层内内容
  newDiv.innerHTML = "<h4></h4><p>"+titles+"</p><p class='fontss'>"+ message + "</p>";
  newDiv.innerHTML += '<div class="bnt"><a href="javascript:cancel_mess_div(\''+ids+'\')" class="bnt_submit" title="确定">确定</a></div>';
  document.body.appendChild(newDiv);

  // mask图层
  var newMask = document.createElement("div");
  newMask.id = m;
  newMask.style.position = "absolute";
  newMask.style.zIndex = "9999";
  newMask.style.width = document.body.scrollWidth + "px";
  newMask.style.height = document.body.scrollHeight + "px";
  newMask.style.top = "0px";
  newMask.style.left = "0px";
  newMask.style.background = "#FFF";
  newMask.style.filter = "alpha(opacity=30)";
  newMask.style.opacity = "0.40";
  document.body.appendChild(newMask);
}
/*结束提示信息框*/

// 关闭mask和新图层
function cancel_mess_div(ids)
{
  document.body.removeChild(docEle('speDiv'));
  document.body.removeChild(docEle('mask'));
  $("#"+ids).val("");
  
}
