/*  $(document).ready(function(){
    $("#get_checkcode").click(function get_mobile(){
        var mcode=Math.round(Math.random()*10000);
        $.get("getmsg.php?mobile="+$("#username").val()+"&mcode="+mcode,function(data){
//          alert(data);
       
        });
       
        $("#reg_btn").click(function get_code(){
        $.get("getmsg.php?code="+$("#code").val(),function(data){
//          alert(mcode);
            if (mcode==$("#code").val())
            {
                alert('验证码正确，请继续！');
            }
            else{
                alert('验证码错误');
            }
        });
    });
    });
       
var test = {
       node:null,
       count:60,
       start:function(){
          //console.log(this.count);
          if(this.count > 0){
             this.node.innerHTML = this.count--;
             var _this = this;
             setTimeout(function(){
                _this.start();
             },1000);
          }else{
             this.node.removeAttribute("disabled");
             this.node.innerHTML = "再次发送";
             this.count = 60;
          }
       },
       //初始化
       init:function(node){
          this.node = node;
          this.node.setAttribute("disabled",true);
          this.start();
       }
    };
    var btn = document.getElementById("get_checkcode");
    btn.onclick = function(){
       alert("验证信息会发送到"+$("#username").val());
       test.init(btn);
    };
  });*/
  
$(document).ready(function(e) {		
	
	/*找回密码tab begin*/
	$(".findpass h2").click(function(){
	$(this).addClass("cur").siblings().removeClass("cur");
	index = $(this).index();
	$(".findpass_info").css("display","none");
	$(".findpass_info").eq(index).css("display","block");
	})
	/*找回密码tab end*/
});


/* *
 * 修改会员信息
 */
function userEdit()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var msg = '';
  var reg = null;
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 7; i < frm.elements.length - 2; i++)	// 从第七项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* 会员修改密码 */
function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += both_password_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}


/*对发布文章进行管理*/
function submitArticle()
{
	var frm  = document.forms['formArticle'];
	if($("#title").val().length==0)
	{
		alert("请填写标题！");
		return false;
	}
	
	if (frm.elements['cat_id'] && frm.elements['cat_id'].value == 0)
    {
	  alert("请选择分类！");
		return false;
    }
	 return true;
}


/* *
 * 对会员的留言输入作处理
 */
function submitMsg()
{

  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg_type    = frm.elements['msg_type'].value;
  var msg = '';



  if (msg_title.length == 0)
  {
    msg += msg_title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += msg_content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += msg_title_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对回复内容处理
 */
function submitRecontent()
{
  var frm         = document.forms['formrecontents'];
  var msg_content = frm.elements['content'].value;
  var msg = '';

  if (msg_content.length == 0)
  {
    msg += c_content_empty + '\n'
  }

  if (msg_content.length > 200)
  {
    msg +=c_content_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对投诉页面作处理
 */
function submitComplaint()
{
  var frm         = document.forms['formComplaints'];
  var msg_content = frm.elements['content'].value;
  var msg = '';

  if (msg_content.length == 0)
  {
    msg += c_content_empty + '\n'
  }

  if (msg_content.length > 200)
  {
    msg +=c_content_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}


/* *
 * 卖家发货页面作处理
 */
function submitSellshipping()
{
  var frm         = document.forms['formSshipping'];
  var s_ship_id = frm.elements['s_ship_id'].value;
  var msg = '';

  if (s_ship_id.length == 0 || s_ship_id == 0)
  {
    msg += c_content_empty + '\n'
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}
/* *
 * 对经纪人评分页面作处理
 */
function submitCommentorder()
{

  var frm         = document.forms['formCommentorder'];
  var msg_content = frm.elements['content'].value;
  var msg = '';

  var list= $('input:radio[name="comment_rank"]:checked').val();
  if(list==null){
	msg += c_rank_empty + '\n'
  }
  if (msg_content.length == 0)
  {
    msg += c_content_empty + '\n'
  }
  
  if ( msg_content.length > 0 && msg_content.length < 2)
  {
    msg +=c_content_too_short + '\n';
  }

  if (msg_content.length > 200)
  {
    msg +=c_content_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对经纪人取消订单提交作处理
 */
function submitCancelorder()
{

  var frm         = document.forms['formcancelOrder'];
  var msg_content = frm.elements['c_reson'].value;
  var dishonesty_num1 = frm.elements['dishonesty_num1'].value;
  var dishonesty_num2 = frm.elements['dishonesty_num2'].value;
  var msg = '';

  var list= $('input:radio[name="back_store"]:checked').val();
  if(list==null){
	msg += c_back_store_empty + '\n'
  }
  
  if (dishonesty_num1.length == 0)
  {
    msg += c_sell_num_empty + '\n'
  }
  if (dishonesty_num2.length == 0)
  {
    msg += c_buy_num_empty + '\n'
  }
  if (msg_content.length == 0)
  {
    msg += c_reson_empty + '\n'
  }
  
  if ( msg_content.length > 0 && msg_content.length < 2)
  {
    msg +=c_reson_too_short + '\n';
  }

  if (msg_content.length > 200)
  {
    msg +=c_reson_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对经纪确定违规货品提交作处理
 */
function submitViolation()
{

  var frm         = document.forms['formViolation'];
  var msg_content = frm.elements['content'].value;
  var msg = '';

  var list= $('input:radio[name="is_violation"]:checked').val();
  if(list==null){
	msg += v_back_store_empty + '\n'
  }
  if (msg_content.length == 0)
  {
    msg += v_reson_empty + '\n'
  }
  
  if ( msg_content.length > 0 && msg_content.length < 2)
  {
    msg +=v_reson_too_short + '\n';
  }

  if (msg_content.length > 50)
  {
    msg +=v_reson_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  var user_name = frm.elements['user_name'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
  }

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      errorMsg += email_address_error + '\n';
    }
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }

  return true;
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}


/* *
 * 会员用手机验证码找回密码时，对输入作处理
 */
function submitmobilePwd()
{
  var frm = document.forms['mobilegetPassword'];
  var codes = frm.elements['codes'].value;
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (codes.length == 0)
  {
    errorMsg += codes_empty + '\n';
  }
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员登录
 */
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';

  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/*检测真实姓名*/
function check_real_name( password )
{
	var submit_disabled = false;
    if ( password.length == 0 )
    {
	    $("#realname_notice").html(real_name_empty);
		$("#real_name").addClass("errorinputbg");
		$("#realname_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
    }
	else
	{
		$("#realname_notice").html("");
	    $("#real_name").removeClass("errorinputbg");
	    $("#realname_notice").removeClass("errormsg").addClass("rightmsg");
		var submit_disabled = false;
	}
	
	if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
}

/*检测密码*/
function check_password( password )
{
	var submit_disabled = false;
    if ( password.length < 6 )
    {
	    $("#password_notice").html(password_shorter);
		$("#password1").addClass("errorinputbg");
		$("#password_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
    }
	else if ( password.length > 20 )
    {
	    $("#password_notice").html(password_longth);
		$("#password1").addClass("errorinputbg");
		$("#password_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
    }
	else
	{
		$("#password_notice").html("");
	    $("#password1").removeClass("errorinputbg");
	    $("#password_notice").removeClass("errormsg").addClass("rightmsg");
		var submit_disabled = false;
	}
	
	if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
}

function check_conform_password( conform_password )
{
	var submit_disabled = false;
    password = $('#password1').val();
	
	if ( conform_password.length < 6 )
    {
	    $("#conform_password_notice").html(password_shorter);
		$("#conform_password").addClass("errorinputbg");
		$("#conform_password_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
    }
	else if ( password.length > 20 )
    {
	    $("#conform_password_notice").html(password_longth);
		$("#conform_password").addClass("errorinputbg");
		$("#conform_password_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
    }
	else if ( conform_password != password )
    {
		$("#conform_password_notice").html(confirm_password_invalid);
		$("#conform_password").addClass("errorinputbg");
		$("#conform_password_notice").removeClass("rightmsg").addClass("errormsg");
        var submit_disabled = true;
	}
	else
	{
		$("#conform_password_notice").html("");
	    $("#conform_password").removeClass("errorinputbg");
	    $("#conform_password_notice").removeClass("errormsg").addClass("rightmsg");
		var submit_disabled = false;
	}
	
	if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
}

/*检测手机号码是否注册*/
function is_registered( username )
{
	var submit_disabled = false;
	  var reg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
	    if ( username == '' )
	    {
		    $("#username_notice").html(msg_un_blank);
		  	$("#username").addClass("errorinputbg");
		   	$("#username_notice").removeClass("rightmsg").addClass("errormsg");
	      var submit_disabled = true;
	    }else  if (!reg.test(username)) {
	     $("#username_notice").html(username_shorter);
	     $("#username").addClass("errorinputbg");
	     $("#username_notice").removeClass("rightmsg").addClass("errormsg");
	     var submit_disabled = true;
	  }
//
//    var submit_disabled = false;
//	var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
//
//    if ( username == '' )
//    {
//	    $("#username_notice").html(msg_un_blank);
//		$("#username").addClass("errorinputbg");
//		$("#username_notice").removeClass("rightmsg").addClass("errormsg");
//        var submit_disabled = true;
//    }
//    if ( unlen < 5 )
//    { 
//	    $("#username_notice").html(username_shorter);
//		$("#username").addClass("errorinputbg");
//		$("#username_notice").removeClass("rightmsg").addClass("errormsg");
//        var submit_disabled = true;
//    }
//    if ( unlen > 11 )
//    {
//		$("#username_notice").html(msg_un_length);
//		$("#username").addClass("errorinputbg");
//        $("#username_notice").removeClass("rightmsg").addClass("errormsg");
//        var submit_disabled = true;
//    }
    if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    Ajax.call( shop_url+'user.php?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );
}



function registed_callback(result)
{
  if ( result == "true" )
  {
	$("#username_notice").html("");
	$("#username").removeClass("errorinputbg");
	$("#username_notice").removeClass("errormsg").addClass("rightmsg");
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {
	$("#username_notice").html(msg_un_registered);
	$("#username").addClass("errorinputbg");
    $("#username_notice").removeClass("rightmsg").addClass("errormsg");
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

/* *
 * 处理注册用户
 */
function register()
{

 var frm  = document.forms['formUser'];
  var username  = Utils.trim(frm.elements['user_name'].value);
  var real_name  = frm.elements['real_name'].value;
  var password  = Utils.trim(frm.elements['password'].value);
  var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var list= $('input:radio[name="sex"]:checked').val();
  var checkcode  = Utils.trim(frm.elements['code'].value);

  var msg = "";
  // 检查输入

  var msg = '';
  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }
  else if (username.length < 5)
  {
    msg += username_shorter + '\n';
  }
  else if (username.length > 11)
  {
    msg += msg_un_length + '\n';
  }
  
  if (real_name.length == 0)
  {
    msg += real_name_empty + '\n';
  }
 
  if(list==null){
	  msg += sex_empty + '\n';
  }
  
  if (frm.elements['country'] && frm.elements['country'].value == 0)
  {
	msg += country_not_null + '\n';
  }
  
  if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
  {
	msg += province_not_null + '\n';
  }

  if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
  {
	msg += city_not_null + '\n';
  }

  if (frm.elements['district'] && frm.elements['district'].length > 1)
  {
    if (frm.elements['district'].value == 0)
    {
	  msg += district_not_null + '\n';
    }
  }
  
  if (frm.elements['broker_id'] && frm.elements['broker_id'].value == 0)
  {
	msg += broker_not_null + '\n';
  }
  
  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }
  else if (password.length < 6)
  {
    msg += password_shorter + '\n';
  }
  else if (password.length > 20)
  {
    msg += password_longth + '\n';
  }
  if (/ /.test(password) == true)
  {
	msg += passwd_balnk + '\n';
  }
  if (confirm_password != password )
  {
    msg += confirm_password_invalid + '\n';
  }
  
/*  if(checkcode.length == 0)
  {
    msg += code_not_null + '\n';
  }*/
  
  if(checked_agreement != true)
  {
    msg += agreement + '\n';
  }

 
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}



/* *
 * 会员余额申请
 */
function submitSurplus()
{
  var frm            = document.forms['formSurplus'];
  var surplus_type   = frm.elements['surplus_type'].value;
  var surplus_amount = frm.elements['amount'].value;
  var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (process_notic.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      alert(payment_empty);
      return false;
    }
  }

  return true;
}

/*检查是否提交真实姓名*/
function submiterrorname()
{
	if($("#real_name").val().length==0)
	{
		alert("请填写您的真实姓名！");
		return false;
	}
}

/*检查是否提交密保邮箱*/
function submitnewemial()
{
	if($("#newemail").val().length==0)
	{
		alert("请填写密保邮箱后再提交！");
		return false;
	}
	
	if ( ! (Utils.isEmail($("#newemail").val())))
    {
        alert("邮箱格式错误！");
		return false;
    }
}

/*检查是否提交重置邮箱*/
function submitupdateemial()
{
	if($("#updateemail").val().length==0)
	{
		alert("请填写重置邮箱后再提交！");
		return false;
	}
	if ( ! (Utils.isEmail($("#updateemail").val())))
    {
        alert("邮箱格式错误！");
		return false;
    }
}

/*验证数字*/
function isDigit(val,ids)
{
	if(val==0)
	{
		alert("要填写大于0的正整数！");
		$("#"+ids).val("");
		return false;
	}
}
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数	
function sendMessage(flag) {
	var t=$("input[name='user_name']").val();
	var telReg = t.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	if(telReg == null){
		alert('手机号码错误！')
		return;
	}
    curCount = count;
	var user_name=$("input[name='user_name']").val();
	if(user_name==''){
		alert('请输入账号(手机号码)');$("input[name='user_name']").focus();return false;
	}
	
	var act = flag ? 'get_reg_ver' : 'get_ver_mobile';	// 获取注册验证码或是重置密码的验证码
	
    //向后台发送处理数据
    $.ajax({
        type: "POST",
        //用POST方式传输
        dataType: "JSON",
        //数据格式:JSON
        url: 'user.php',
        //目标地址
        data: {act:act,mobile:user_name},
        error: function(XMLHttpRequest, textStatus, errorThrown) {},
        success: function(result) {
			if(result.error==0){
				//设置button效果，开始计时
				$("#btnSendCode").attr("disabled", "true");
				$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
				InterValObj = window.setInterval(SetRemainTime, 1000);
				//启动计时器，1秒执行一次
			}
			alert(result.message);
		}

    });

}

function w_sendMessage() {
	var t=$("input[name='user_name']").val();
	var telReg = t.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	if(telReg == null){
		alert('手机号码错误！')
		return;
	}
    curCount = count;
	var user_name=$("input[name='user_name']").val();
	if(user_name==''){
		alert('请输入账号(手机号码)');$("input[name='user_name']").focus();return false;
	}
	
    //向后台发送处理数据
    $.ajax({
        type: "POST",
        //用POST方式传输
        dataType: "JSON",
        //数据格式:JSON
        url: 'warehouse_user.php',
        //目标地址
        data: {act:'get_ver_mobile',mobile:user_name},
        error: function(XMLHttpRequest, textStatus, errorThrown) {},
        success: function(result) {
			if(result.error==0){
				//设置button效果，开始计时
				$("#btnSendCode").attr("disabled", "true");
				$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
				InterValObj = window.setInterval(SetRemainTime, 1000);
				//启动计时器，1秒执行一次
			}
			alert(result.message);
		}

    });

}

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);
        //停止计时器
        $("#btnSendCode").removeAttr("disabled");
        //启用按钮
        $("#btnSendCode").val("重新发送验证码");
        code = "";
        //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    

    }
    else {
        curCount--;
        $("#btnSendCode").val("请在" + curCount + "秒内输入验证码");

    }

}