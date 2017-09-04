//新建收货地址

function upateAddress(){ 
	var frm1=document.forms['formsUpate'];
	var username=frm1.elements['consignee'].value;
	var userphone=frm1.elements['mobile'].value;
	var phonRem=/^[1][358][0-9]{9}$/;
	var datail=frm1.elements['address'].value;
	var msg1=new Array();
	if(username.length==0){ 
		msg1.push(usernaem_emty);
	}


	if(userphone.length==0){ 
		msg1.push(userphone_emty);
	}else if(!phonRem.test(userphone)){ 
		msg1.push(userphone_length);
	}

	//省份选择为空
	 if (frm1.elements['province'] && frm1.elements['province'].value == 0 && frm1.elements['province'].length > 1){
	 	
		msg1.push(province_not_null);

	 }
	
	 //城市选择为空
	if (frm1.elements['city'] && frm1.elements['city'].value == 0 && frm1.elements['city'].length >1){
	 	
		msg1.push(city_not_null);

	 }
	 //区选择为空
	 if(frm1.elements['district']&&frm1.elements['district'].value==0&&frm1.elements['district'].length>1){ 
	 
	 	msg1.push(district_not_null);
	 }
	 //详细地址
	 if(datail.length==0){ 
	 	msg1.push(datail_address_null);
	 }

	if(msg1.length>0){

		var messge=msg1.join('/');

		$(".saveTipText").html(messge);

		return false;
	}else{ 
		return true;
	}
}
//售后填写
function reason(){ 
var frm5=document.forms['sales_cause'];
var r_price=frm5.elements['r_price'].value;
var r_explain=frm5.elements['r_explain'].value;
var jine=/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
if(frm5.elements['reason_select'] && frm5.elements['reason_select'].value==0){ 
	alert("请选择退款原因");
	return false;
}
if(r_price.length==0){ 
	alert("请输入退款金额");
	return false;

}else if(!jine.test(r_price)){ 
	alert("输入金额格式不对");
	return false;

}

if(r_explain.length==0){
	alert("说明原因不能为空");
	return false; 

}  
return true;
}