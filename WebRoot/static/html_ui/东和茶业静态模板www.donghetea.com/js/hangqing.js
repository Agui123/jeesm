/*升降价通知begin*/
function show_Pricenotice()
{
   ShowDiv('showboxid','220');
}



function addupdatenotice()
{
   var goods        = new Object();
   goods.goods_id = goods_id;
   goods.goods_name = goods_name;
   goods.user_name = user_name;
   goods.highprice =$("#highprice").val();
   goods.lowprice =$("#lowprice").val();
   
   if((goods.highprice.length ==0 && goods.lowprice.length ==0) || (goods.highprice<=0 &&  goods.lowprice<=0 ) )
   {
	   alert("请输入参考价高于或参考价低于多少金额！");
	   return false;
   }
   
   Ajax.call(shop_url+'goods.php?id='+goods_id+'&act=add_changenotice', 'goods=' + $.toJSON(goods), add_changenoticeResponse, 'POST', 'JSON');
}

function add_changenoticeResponse(result)
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
		$('#showboxid').hide();  
        $('#fade, a.close').remove();  
		alert(result.message);
	  }
}
/*升降价通知end*/

/*选择时间检测*/
function checktime(){

	start_time=$("#begin_day").val();
	end_time=$("#end_day").val();;
	d1 = new Date(start_time.replace(/-/g,"/")); 
	d2 = new Date(end_time.replace(/-/g,"/")); 
	dif = (d2-d1)/(60*1000);
    
	var myDate = new Date();
	var myYear =myDate.getYear(); 
	var myMon =myDate.getMonth(); 
	var myDay =myDate.getDay(); 

	if(start_time!=""&&end_time!=""&&dif>0){
		return true;
	}else{
		alert('请正确的查询时间');
		return false;
	}

}


/*添加茶叶名称begin*/
jQuery(document).ready(function(){

		
	$("#add_nickname").click(function(){
		if($('#TNicknamebox').length <=0)
		{
	 	  $(this).after("<div id='TNicknamebox'><form name='NickForm' id='NickForm' method='post'><div class='topbox'><h2 onclick='closenbox()'>×</h2></div><div class='thanksword'><span>谢谢您</span>为大家提供您所知道的茶叶俗称</div><div class='nicknotice'><p class='ntitle'>请填写您所知道的茶叶的俗称，每次可最多提交3个。</p><p class='nnotice'>注意事项：</p><p class='ncontent'>每个空请只填写1个俗称<br/>请注意不要包含错别字。</p></div><div class='blank'></div><div class='npicbox'><div class='npic_l f_l'><img src='"+goods_thumbs+"' /></div><div class='npic_r f_r'><div class='nname'><ul class='nnbox'><li><span>1</span>茶叶俗称 <input type='text' name='tag_words1' class='input_tag' /></li><li><span>2</span>茶叶俗称 <input type='text' name='tag_words2' class='input_tag' /></li><li><span>3</span>茶叶俗称 <input type='text' name='tag_words3' class='input_tag' /></li></ul><ul class='checkbox'><li>请输入验证码<input type='text' name='captcha' size=4 /><img src=\"captcha.php?"+rands+"\" alt='captcha' style='vertical-align: middle;cursor: pointer;' onClick=\"this.src='captcha.php?'+Math.random()\" /> </li></ul></div></div></div><div class='blank1'></div><div class='nsubmit'><a href='javascript:addnikename("+goods_id+")' class='nbtn' ></a></div></form></div>");
		}

	})
})

function closenbox()
{
	$('#TNicknamebox').remove();
}


function addnikename(goodsId)
{
   var goods        = new Object();
   var formTick      = document.forms['NickForm'];
   goods.goods_id = goodsId;
   goods.tag_words1 = formTick.elements['tag_words1'].value;
   goods.tag_words2 = formTick.elements['tag_words2'].value;
   goods.tag_words3 = formTick.elements['tag_words3'].value;
   goods.captcha = formTick.elements['captcha'].value;
   Ajax.call(shop_url+'goods.php?id='+goodsId+'&act=add_nickname', 'goods=' + $.toJSON(goods), addToNicknameResponse, 'POST', 'JSON');
}

function addToNicknameResponse(result)
{
	if (result.error > 0)
    {
		 alert(result.message);
	}
	else
	{
		$('#TNicknamebox').remove();
		alert("非常感谢！你所添加的俗称已经成功提交，我们会尽快审核你提交的俗称信息！");
	}
}
/*添加茶叶名称end*/