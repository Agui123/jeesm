//弹出隐藏层
function ShowDiv(showdivbox,div_width)
{
		var popID = showdivbox; //弹出窗id
		var popWidth = div_width; //宽度

		//Fade in the Popup and add close button
		$('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).prepend('<a href="#" class="close"><img src="images/close_pop.png" class="btn_close" title="Close Window" alt="Close" /></a>');
		
		//Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
		var popMargTop = ($('#' + popID).height() + 80) / 2;
		var popMargLeft = ($('#' + popID).width() + 80) / 2;
		
		//Apply Margin to Popup
		$('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		//Fade in Background
		$('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
		$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer 
		
		return false;
}


$(document).ready(function(){
	//Close Popups and Fade Layer
	$('a.close, #fade').live('click', function() { //When clicking on the close or fade layer...
	  	$('#fade , .popup_block').fadeOut(function() {
			$('#fade, a.close').remove();  
	}); //fade them both out
		
		return false;
	});
});


/*添加修改地址*/
function show_ConsigneeDetail(addrid)
{
	 Ajax.call(shop_url+'user.php?act=get_address_list', 'id=' + addrid, show_ConsigneeResponse, 'GET', 'JSON');
}

/*添加修改地址ajax*/
function show_ConsigneeResponse(result)
{
  if (result.error > 0)
  {
    alert(result.message);
  }
  else
  {
	  $("#selCountries_1000").val(result.country);
	  $("#selProvinces_1000").html(result.country_list).val(result.province);
	  $("#selCities_1000").html(result.city_list).val(result.city);
	  $("#newconsignee").val(result.consignee);
	  $("#newaddress").val(result.address);
	  $("#newaddress_id").val(result.address_id);
	  $("#newmobile").val(result.mobile);
	  $("#newtel").val(result.tel);
	  $("#newemail").val(result.email);
	  $("#newzipcode").val(result.zipcode);
	  result.district > 0 ? $("#selDistricts_1000").html(result.district_list).val(result.district).show(): $("#selDistricts_1000").html(result.district_list).val('').hide();
	  result.defaults > 0 ? $('input:checkbox[id="defaultid"]').attr("checked",true) : $('input:checkbox[id="defaultid"]').attr("checked",false);
	  ShowDiv('showboxid','600');
  }
}

/*添加修改某个收货地址ajax*/
function update_Consignee()
{
	var msg = new Array();
	var err = false;
	var consignee = new Object();
	consignee.consignee = $("#newconsignee").val();
	consignee.user_ids = $("#user_ids").val();
	consignee.country = $("#selCountries_1000").val();
	consignee.province = $("#selProvinces_1000").val();
	consignee.city = $("#selCities_1000").val();
	consignee.district = $("#selDistricts_1000").val();
	consignee.address = $("#newaddress").val();
	consignee.address_id = $("#newaddress_id").val();
	consignee.mobile = $("#newmobile").val();
	consignee.tel = $("#newtel").val();
	consignee.email = $("#newemail").val();
	consignee.zipcode = $("#newzipcode").val();

	if (Utils.isEmpty(consignee.consignee))
	{
	  err = true;
	  msg.push(consignee_not_null);
	}
  
	if (consignee.country == 0)
	{
	  msg.push(country_not_null);
	  err = true;
	}
	
	if (consignee.province == 0 && $("select[name=province] option").size() > 1)
	{
	  err = true;
	  msg.push(province_not_null);
	}
  
	if (consignee.city ==0 && $("select[name=city] option").size() > 1)
	{
	  err = true;
	  msg.push(city_not_null);
	}
  
	if (consignee.district==0 && $("select[name=district] option").size() > 1)
	{
		err = true;
		msg.push(district_not_null);
	}
	
	if (Utils.isEmpty(consignee.address))
	{
	  err = true;
	  msg.push(address_not_null);
	}
  
	if (consignee.email.length >0 && ! Utils.isEmail(consignee.email))
	{
	  err = true;
	  msg.push(invalid_email);
	}
  
	if (Utils.isEmpty(consignee.tel) && Utils.isEmpty(consignee.mobile))
	{
	  err = true;
	  msg.push(tele_not_null);
	}
  
	if (consignee.tel.length >0 && (!Utils.isTel(consignee.tel)) )
	{
	  err = true;
	  msg.push('联系电话输入格式不正确，输入格式如 020-88888888');
	}
  
	if (consignee.zipcode.length>0 && (!Utils.isZipCode(consignee.zipcode)))
	{
	  err = true;
	  msg.push(zip_not_num);
  
	}
  
	if ((consignee.mobile.length > 0 && (!Utils.isMobile(consignee.mobile))))
	{
	  err = true;
	  msg.push(mobile_invaild);
	}

	if (err)
	{
	  message = msg.join("\n");
	  alert(message);
	}
	else
	{
		var list= $('input:checkbox[id="defaultid"]:checked').val();
		if(list==null){
		  consignee.defaults = 0;
		}
		else
		{
		  consignee.defaults = 1;
		}
	  
	    Ajax.call(shop_url+'user.php?act=update_address_list', 'consignee=' + $.toJSON(consignee), update_ConsigneeResponse, 'POST', 'JSON');
	 }
}

/*添加修改某个收货地址ajax*/
function update_ConsigneeResponse(result)
{
  $('#showboxid').hide();  
  $('#fade, a.close').remove();  
  
  if (result.id > 0)
  {
	 $("#raddresstxt"+result.id).html(result.content);  
  }
  else
  {
	 $("#new_address").before(result.content); 
  }
  if (result.error > 0)
  {
    alert(result.message);
  }
  
}

/*删除地址ajax*/
function delete_Consignee(addrid)
{
	if (confirm('删除后将无法恢复，你确定要删除此收货地址吗？'))
    {
	   Ajax.call(shop_url+'user.php?act=del_address_list', 'id=' + addrid, del_ConsigneeResponse, 'GET', 'JSON');
	}
	else
	{
		return false;
	}
}

/*删除地址ajax*/
function del_ConsigneeResponse(result)
{
  if (result.error == 2)
  {
	//$('input:radio[id="raddress'+result.id+'"]').remove();  
	$("#raddress"+result.id).remove();  
  }
  if (result.error > 0)
  {
    alert(result.message);
  }
}

/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm)
{
  var msg = new Array();
  var err = false;
  
  if (Utils.isEmpty(frm.elements['consignee'].value))
  {
    err = true;
    msg.push(consignee_not_null);
  }
  

  if (frm.elements['country'] && frm.elements['country'].value == 0)
  {
    msg.push(country_not_null);
    err = true;
  }
  
  if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
  {
    err = true;
    msg.push(province_not_null);
  }

  if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
  {
    err = true;
    msg.push(city_not_null);
  }

  if (frm.elements['district'] && frm.elements['district'].length > 1)
  {
    if (frm.elements['district'].value == 0)
    {
      err = true;
      msg.push(district_not_null);
    }
  }


  
  if (Utils.isEmpty(frm.elements['address'].value))
  {
    err = true;
    msg.push(address_not_null);
  }

  if (frm.elements['email'].value.length >0 && ! Utils.isEmail(frm.elements['email'].value))
  {
    err = true;
    msg.push(invalid_email);
  }

  if (Utils.isEmpty(frm.elements['tel'].value) && Utils.isEmpty(frm.elements['mobile'].value))
  {
    err = true;
    msg.push(tele_not_null);
  }

  if (frm.elements['tel'] &&frm.elements['tel'].value.length >0 && (!Utils.isTel(frm.elements['tel'].value)) )
  {
    err = true;
    msg.push('联系电话输入格式不正确，输入格式如 020-88888888');
  }

  if (frm.elements['zipcode'] && frm.elements['zipcode'].value.length>0 && (!Utils.isZipCode(frm.elements['zipcode'].value )))
  {
    err = true;
    msg.push(zip_not_num);

  }


  if ((frm.elements['mobile'] && frm.elements['mobile'].value.length > 0 && (!Utils.isMobile(frm.elements['mobile'].value))))
  {
    err = true;
    msg.push(mobile_invaild);
  }


  if (err)
  {
    message = msg.join("\n");
    alert(message);
  }
  return ! err;
}

/**
 * 新增一个图片
 */
function addImg(obj)
{
	
	gaerryize = $(".galleryboxs").size();
	picsize = $("#gallery-table tr").size();
	
	if((picsize+gaerryize) >= 5 || picsize==4)
	{
		alert("抱歉，最多可上传4张照片！");
		return false;
	}
	
	
	var src  = obj.parentNode.parentNode;

	var idx  = rowindex(src);
	var tbl  = document.getElementById('gallery-table');
	var row  = tbl.insertRow(idx + 1);
	var cell = row.insertCell(-1);
	cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addImg)(.*)(\【)(\+)/i, "$1removeImg$3$4-");
}


  /**
   * 删除图片
   */
function dropImg(imgId,types,table)
{
  Ajax.call('user.php?act=drop_image', "img_id="+imgId+"&types="+types+"&table="+table, dropImgResponse, "GET", "JSON");
}

function dropImgResponse(result)
{
	if (result.error == 0)
	{
		document.getElementById('gallery_' + result.content).style.display = 'none';
	}
	document.location.reload();
}

/**
 * 删除图片上传
 */
function removeImg(obj)
{
	var row = rowindex(obj.parentNode.parentNode);
	var tbl = document.getElementById('gallery-table');

	tbl.deleteRow(row);
}


function sellbuyCheck()
{
	var msg = new Array();
	var err = false;
	var types = $("#goods_types").val();

	if (Utils.isEmpty($("#goods_name").val()))
	{
	  err = true;
	  msg.push(goods_name_not_null);
	}
	
	if ($("#brand_id").val()==0)
	{
	  msg.push(brand_not_null);
	  err = true;
	}
  
	if (Utils.isEmpty($("#price").val()))
	{
	  msg.push(goods_price_not_null);
	  err = true;
	}
	
	if (Utils.isEmpty($("#goods_number").val()))
	{
	  msg.push(goods_number_not_null);
	  err = true;
	}
	
	if ($("#goods_unit").val()==0)
	{
	  msg.push(unit_not_null);
	  err = true;
	}
	
	if (types==2 && $("#selCountries_1").val()==0)
	{
	  msg.push(scountry_not_null);
	  err = true;
	}
	
	if (types==2 && $("#selProvinces_1").val()==0 && $("select[name=aprovince] option").size() > 1)
	{
	  err = true;
	  msg.push(sprovince_not_null);
	}
	
	if (types==2 && $("#selCities_1").val()==0 && $("select[name=acity] option").size() > 1)
	{
	  err = true;
	  msg.push(scity_not_null);
	}
	
	var is_shed=$('input:radio[name="is_shed"]:checked').val();
	if(is_shed==null){
	   err = true;
	   msg.push(types==1 ? is_shied_not_null : is_shied_sell_not_null);
	}
	
	if ($("#effective_time").val()==0)
	{
	  msg.push(effective_time_not_null);
	  err = true;
	}
	
	if ($("#description").val().length > 50)
	{
	  msg.push(description_too_long);
	  err = true;
	}
	
	var addr=$('input:radio[name="address_id"]:checked').val();
	if((addr==null ||addr == 0 ) && types ==1){
	   err = true;
	   msg.push(address_id_not_null);
	}
	
	if (err)
	{
	  message = msg.join("\n");
	  alert(message);
	}
	
	return ! err;
}


/*上架下架删除批量功能*/
function submitaction(action)
{
	
	$("#doaction").val(action);
	var list=$('input:checkbox[name="checkboxes[]"]:checked').val();
	if(list==null){
	    alert("请选择要操作的货品！");
		return false;
	}

	if(action=='delete')
	{
	  if(confirm('删除后将无法恢复，你确定要批量删除选中的货品吗？'))
	  {
		 formTealist.submit();
	  }
    }
	else
	{
	   formTealist.submit();
	}
}