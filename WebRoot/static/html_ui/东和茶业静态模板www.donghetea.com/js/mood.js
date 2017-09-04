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
function $$$() {
  var elements = new Array();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }

  return elements;
}
function get_mood(mood_id)
{
	if(moodzt == "1" || isvote=='1') 
	{
		alert("您已经投过票，请不要重复投票！");
		return false;
	}
	else {
		url = shop_url+"xinqing.php?action=mood&classid="+classid+"&id="+infoid+"&typee="+mood_id+"&m=" + Math.random();
		makeRequest(url,'return_review1','GET','');
		moodzt = 1;
		
	}
}
function remood()
{
	url = shop_url+"xinqing.php?action=show&id="+infoid+"&classid="+classid+"&m=" + Math.random();
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
	var imga = "images/mood/pre_02.gif";
	var imgb = "images/mood/pre_01.gif";
	var color1 = "#666666";
	var color2 = "#EB610E";
	var heightz = "80";	//图片100%时的高
	var hmax = 0;
	var hmaxpx = 0;
	var heightarr = new Array();
	var moodarr = moodtext.split(",");
	var moodzs = 0;
	for(k=0;k<8;k++) {
		moodarr[k] = parseInt(moodarr[k]);
		moodzs += moodarr[k];
	}
	for(i=0;i<8;i++) {
		heightarr[i]= Math.round(moodarr[i]/moodzs*heightz);
		if(heightarr[i]<1) heightarr[i]=1;
		if(moodarr[i]>hmaxpx) {
		hmaxpx = moodarr[i];
		}
	}
	$$$("moodtitle").innerHTML = "<span style='color: #555555;padding-left: 20px;'> 看完这篇新闻有何感觉！ 已有<font color='#FF0000'>"+moodzs+"</font>人表态：</span>";
	for(j=0;j<8;j++)
	{
		if(moodarr[j]==hmaxpx && moodarr[j]!=0) {
			$$$("moodinfo"+j).innerHTML = "<span style='color: "+color2+";'>"+moodarr[j]+"</span><br><img src='"+imgb+"' width='20' height='"+heightarr[j]+"'>";
		} else {
			$$$("moodinfo"+j).innerHTML = "<span style='color: "+color1+";'>"+moodarr[j]+"</span><br><img src='"+imga+"' width='20' height='"+heightarr[j]+"'>";
		}
	}
}
document.writeln("<table width=\"618\" border=\"0\" cellpadding=\"0\" cellspacing=\"2\" style=\"font-size:12px;margin-top: 20px;margin-bottom: 20px;\">");
document.writeln("<tr>");
document.writeln("<td colspan=\"8\" id=\"moodtitle\"  class=\"left\"><\/td>");
document.writeln("<\/tr>");
document.writeln("<tr align=\"center\" valign=\"bottom\">");
document.writeln("<td height=\"60\" id=\"moodinfo0\"><\/td><td height=\"30\" id=\"moodinfo1\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo2\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo3\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo4\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo5\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo6\">");
document.writeln("<\/td><td height=\"30\" id=\"moodinfo7\">");
document.writeln("<\/td><\/tr>");
document.writeln("<tr align=\"center\" valign=\"middle\">");
document.writeln("<td><img src=\"images\/mood\/mood1.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood2.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood3.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood4.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood5.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood6.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood7.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<td><img src=\"images\/mood\/mood8.png\" width=\"56\" height=\"57\"><\/td>");
document.writeln("<\/tr>");
document.writeln("<tr>");
document.writeln("<td align=\"center\" class=\"hui\">高兴<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">难过<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">期待<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">恶心<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">惊讶<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">忧虑<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">愤怒<\/td>");
document.writeln("<td align=\"center\" class=\"hui\">路过<\/td>");
document.writeln("<\/tr>");
document.writeln("<tr align=\"center\">");
document.writeln("<td><input onClick=\"get_mood(\'mood1\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood2\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood3\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood4\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood5\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood6\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood7\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<td><input onClick=\"get_mood(\'mood8\')\" type=\"radio\" name=\"radiobutton\" value=\"radiobutton\"><\/td>");
document.writeln("<\/tr>");
document.writeln("<\/table>")
remood();