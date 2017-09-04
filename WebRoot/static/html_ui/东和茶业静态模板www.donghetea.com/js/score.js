/* *
 * 评论的翻页函数
 */
function gotoscorePage(page, id, type)
{
  Ajax.call(shop_url+'score.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoscorePageResponse, 'GET', 'JSON');
}

function gotoscorePageResponse(result)
{
  document.getElementById("ECS_SCORE").innerHTML = result.content;
}


var moodzt = "0";
var http_request = false;
function makeRequest(url, functionName, httpType, sendData) {

	http_request = false;
	if (!httpType) httpType = "GET";

	if (window.XMLHttpRequest) { // Non-IE...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/plain');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Cannot send an XMLHTTP request');
		return false;
	}

	var changefunc="http_request.onreadystatechange = "+functionName;
	eval (changefunc);
	//http_request.onreadystatechange = alertContents;
	http_request.open(httpType, url, true);
	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(sendData);
}

function get_mood()
{
	var list= $('input:radio[name="taidu"]:checked').val();
	if(list==null){
	  alert("请选择投票选项！");
	  return false;
	}
	
	if(moodzt == "1" || isvote=='1') 
	{
		alert("您已经投过票，请不要重复投票！");
		return false;
	}
	else {
		mood_id =  $('input:radio:checked').attr("id");
		url = shop_url+"broker_vote.php?action=mood&classid="+classid+"&id="+infoid+"&typee="+mood_id+"&m=" + Math.random();
		makeRequest(url,'return_review1','GET','');
		moodzt = "1";
	}
}
function remood()
{
	url = shop_url+"broker_vote.php?action=show&id="+infoid+"&classid="+classid+"&m=" + Math.random();
	makeRequest(url,'return_review1','GET','');
}
function return_review1(ajax)
{
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var str_error_num = http_request.responseText;
			if(str_error_num=="error")
			{
				alert("信息不存在！");
				return false;
			}
			else if(str_error_num==0)
			{
				alert("您已经投过票，请不要重复投票！");
				return false;
			}
			else
			{
				moodinner(str_error_num);
			}
		} else {
			alert('There was a problem with the request.');
		}
	}
}
function moodinner(moodtext)
{
	var imgs = "images/h_line2.gif";
	var widthz = "100";	//图片100%时的宽
	var hmax = 0;
	var hmaxpx = 0;
	var heightarr = new Array();
	var moodarr = moodtext.split(",");
	var moodzs = 0;
	for(k=0;k<5;k++) {
		moodarr[k] = parseInt(moodarr[k]);
		moodzs += moodarr[k];
	}
	for(i=0;i<5;i++) {
		heightarr[i]= Math.round(moodarr[i]/moodzs*widthz);
		if(moodarr[i]>hmaxpx) {
		hmaxpx = moodarr[i];
		}
	}
	for(j=0;j<5;j++)
	{
		if(heightarr[j]>0)
		{
		  $("#scoreshow"+j).html("<img width='"+heightarr[j]+"' height='16' border='0' src='"+imgs+"'>");
		  $("#scorenum"+j).html(moodarr[j]+'('+heightarr[j]+'%)');
		}
		else
		{
		  $("#scoreshow"+j).html("<img width='0' height='16' border='0' src='"+imgs+"'>");
		  $("#scorenum"+j).html('0(0%)');
		}
	}

}


document.writeln("<div class=\"percent\">");
document.writeln("<dl class=\"clearfix\">");
document.writeln("<dt class=\"f_l dt1\">很好</dt>");
document.writeln("<dd class=\"f_l\" id=\"scoreshow0\"></dd>");
document.writeln("<dt class=\"f_l dt2\" id=\"scorenum0\"></dt>");
document.writeln("</dl>");
document.writeln("<dl class=\"clearfix\">");
document.writeln("<dt class=\"f_l dt1\">好</dt>");
document.writeln("<dd class=\"f_l\" id=\"scoreshow1\"></dd>");
document.writeln("<dt class=\"f_l dt2\" id=\"scorenum1\"></dt>");
document.writeln("</dl>");
document.writeln("<dl class=\"clearfix\">");
document.writeln("<dt class=\"f_l dt1\">一般</dt>");
document.writeln("<dd class=\"f_l\" id=\"scoreshow2\"></dd>");
document.writeln("<dt class=\"f_l dt2\" id=\"scorenum2\"></dt>");
document.writeln("</dl>");
document.writeln("<dl class=\"clearfix\">");
document.writeln("<dt class=\"f_l dt1\">差</dt>");
document.writeln("<dd class=\"f_l\" id=\"scoreshow3\"></dd>");
document.writeln("<dt class=\"f_l dt2\" id=\"scorenum3\"></dt>");
document.writeln("</dl>");
document.writeln("<dl class=\"clearfix\">");
document.writeln("<dt class=\"f_l dt1\">很差</dt>");
document.writeln("<dd class=\"f_l\" id=\"scoreshow4\"></dd>");
document.writeln("<dt class=\"f_l dt2\" id=\"scorenum4\"></dt>");
document.writeln("</dl>");
document.writeln("</div>");
document.writeln("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> ");
document.writeln("<tr>");
document.writeln("<td colspan=\"5\" height=\"29\" ><b>我觉得他/她</b></td>");
document.writeln("</tr>");
document.writeln("<tr>");
document.writeln("<td><input type=\"radio\"  name=\"taidu\" id=\"mood1\" />很好</td>");
document.writeln("<td><input type=\"radio\"  name=\"taidu\" id=\"mood2\" />好</td>");
document.writeln("<td><input type=\"radio\"  name=\"taidu\" id=\"mood3\" />一般</td>");
document.writeln("<td><input type=\"radio\"  name=\"taidu\" id=\"mood4\" />差</td>");
document.writeln("<td><input type=\"radio\"  name=\"taidu\" id=\"mood5\" />很差</td>");
document.writeln("</tr>");
document.writeln("<tr>");
document.writeln("<td colspan=\"5\" height=\"55\" valign=\"middle\" align=\"center\"><input type=\"submit\" class=\"bnt_feng\" value=\"投票\" onclick=\"get_mood()\"></td></td>");
document.writeln("</tr>");
document.writeln("</table>");
remood();