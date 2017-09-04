/**
 * @file            transport.js
 * @description     用于支持AJAX的传输类。
 * @author          ECShop R&D Team ( http://www.ecshop.com/ )
 * @date            2007-03-08 Wednesday
 * @license         Licensed under the Academic Free License 2.1 http://www.opensource.org/licenses/afl-2.1.php
 * @version         1.0.20070308
**/

var Transport =
{
  /* *
  * 存储本对象所在的文件名。
  *
  * @static
  */
  filename : "transport.js",

  /* *
  * 存储是否进入调试模式的开关，打印调试消息的方式，换行符，调试用的容器的ID。
  *
  * @private
  */
  debugging :
  {
    isDebugging : 0,
    debuggingMode : 0,
    linefeed : "",
    containerId : 0
  },

  /* *
  * 设置调试模式以及打印调试消息方式的方法。
  *
  * @public
  * @param   {int}   是否打开调试模式      0：关闭，1：打开
  * @param   {int}   打印调试消息的方式    0：alert，1：innerHTML
  *
  */
  debug : function (isDebugging, debuggingMode)
  {
    this.debugging =
    {
      "isDebugging" : isDebugging,
      "debuggingMode" : debuggingMode,
      "linefeed" : debuggingMode ? "<br />" : "\n",
      "containerId" : "dubugging-container" + new Date().getTime()
    };
  },

  /* *
  * 传输完毕后自动调用的方法，优先级比用户从run()方法中传入的回调函数高。
  *
  * @public
  */
  onComplete : function ()
  {
  },

  /* *
  * 传输过程中自动调用的方法。
  *
  * @public
  */
  onRunning : function ()
  {
  },

  /* *
  * 调用此方法发送HTTP请求。
  *
  * @public
  * @param   {string}    url             请求的URL地址
  * @param   {mix}       params          发送参数
  * @param   {Function}  callback        回调函数
  * @param   {string}    ransferMode     请求的方式，有"GET"和"POST"两种
  * @param   {string}    responseType    响应类型，有"JSON"、"XML"和"TEXT"三种
  * @param   {boolean}   asyn            是否异步请求的方式
  * @param   {boolean}   quiet           是否安静模式请求
  */
  run : function (url, params, callback, transferMode, responseType, asyn, quiet)
  {
    /* 处理用户在调用该方法时输入的参数 */
    params = this.parseParams(params);
    transferMode = typeof(transferMode) === "string"
    && transferMode.toUpperCase() === "GET"
    ? "GET"
    : "POST";

    if (transferMode === "GET")
    {
      var d = new Date();

      url += params ? (url.indexOf("?") === - 1 ? "?" : "&") + params : "";
      url = encodeURI(url) + (url.indexOf("?") === - 1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
      params = null;
    }

    responseType = typeof(responseType) === "string" && ((responseType = responseType.toUpperCase()) === "JSON" || responseType === "XML") ? responseType : "TEXT";
    asyn = asyn === false ? false : true;

    /* 处理HTTP请求和响应 */
    var xhr = this.createXMLHttpRequest();

    try
    {
      var self = this;

      if (typeof(self.onRunning) === "function" && !quiet)
      {
        self.onRunning();
      }

      xhr.open(transferMode, url, asyn);

      if (transferMode === "POST")
      {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }

      if (asyn)
      {
        xhr.onreadystatechange = function ()
        {
          if (xhr.readyState == 4)
          {
            switch ( xhr.status )
            {
              case 0:
              case 200: // OK!
                if (typeof(self.onComplete) === "function")
                {
                  self.onComplete();
                }

                if (typeof(callback) === "function")
                {
                  callback.call(self, self.parseResult(responseType, xhr), xhr.responseText);
                }
              break;

              case 304: // Not Modified
              break;

              case 400: // Bad Request
                 alert("XmlHttpRequest status: [400] Bad Request");
              break;

              case 404: // Not Found
                alert("XmlHttpRequest status: [404] \nThe requested URL "+url+" was not found on this server.");
              break;

              case 409: // Conflict
              break;

              case 503: // Service Unavailable
                 alert("XmlHttpRequest status: [503] Service Unavailable");
              break;

              default:
                alert("XmlHttpRequest status: [" + xhr.status + "] Unknow status.");
            }

            xhr = null;
          }
        }
        if (xhr != null) xhr.send(params);
      }
      else
      {
        if (typeof(self.onRunning) === "function")
        {
          self.onRunning();
        }

        xhr.send(params);

        var result = self.parseResult(responseType, xhr);
        //xhr = null;

        if (typeof(self.onComplete) === "function")
        {
          self.onComplete();
        }
        if (typeof(callback) === "function")
        {
          callback.call(self, result, xhr.responseText);
        }

        return result;
      }
    }
    catch (ex)
    {
      if (typeof(self.onComplete) === "function")
      {
        self.onComplete();
      }

     /* alert(this.filename + "/run() error:" + ex.description);*/
    }
  },

  /* *
  * 如果开启了调试模式，该方法会打印出相应的信息。
  *
  * @private
  * @param   {string}    info    调试信息
  * @param   {string}    type    信息类型
  */
  displayDebuggingInfo : function (info, type)
  {
    if ( ! this.debugging.debuggingMode)
    {
      alert(info);
    }
    else
    {

      var id = this.debugging.containerId;
      if ( ! document.getElementById(id))
      {
        div = document.createElement("DIV");
        div.id = id;
        div.style.position = "absolute";
        div.style.width = "98%";
        div.style.border = "1px solid #f00";
        div.style.backgroundColor = "#eef";
        var pageYOffset = document.body.scrollTop
        || window.pageYOffset
        || 0;
        div.style.top = document.body.clientHeight * 0.6
        + pageYOffset
        + "px";
        document.body.appendChild(div);
        div.innerHTML = "<div></div>"
        + "<hr style='height:1px;border:1px dashed red;'>"
        + "<div></div>";
      }

      var subDivs = div.getElementsByTagName("DIV");
      if (type === "param")
      {
        subDivs[0].innerHTML = info;
      }
      else
      {
        subDivs[1].innerHTML = info;
      }
    }
  },

  /* *
  * 创建XMLHttpRequest对象的方法。
  *
  * @private
  * @return      返回一个XMLHttpRequest对象
  * @type    Object
  */
  createXMLHttpRequest : function ()
  {
    var xhr = null;

    if (window.ActiveXObject)
    {
      var versions = ['Microsoft.XMLHTTP', 'MSXML6.XMLHTTP', 'MSXML5.XMLHTTP', 'MSXML4.XMLHTTP', 'MSXML3.XMLHTTP', 'MSXML2.XMLHTTP', 'MSXML.XMLHTTP'];

      for (var i = 0; i < versions.length; i ++ )
      {
        try
        {
          xhr = new ActiveXObject(versions[i]);
          break;
        }
        catch (ex)
        {
          continue;
        }
      }
    }
    else
    {
      xhr = new XMLHttpRequest();
    }

    return xhr;
  },

  /* *
  * 当传输过程发生错误时将调用此方法。
  *
  * @private
  * @param   {Object}    xhr     XMLHttpRequest对象
  * @param   {String}    url     HTTP请求的地址
  */
  onXMLHttpRequestError : function (xhr, url)
  {
    throw "URL: " + url + "\n"
    +  "readyState: " + xhr.readyState + "\n"
    + "state: " + xhr.status + "\n"
    + "headers: " + xhr.getAllResponseHeaders();
  },

  /* *
  * 对将要发送的参数进行格式化。
  *
  * @private
  * @params {mix}    params      将要发送的参数
  * @return 返回合法的参数
  * @type string
  */
  parseParams : function (params)
  {
    var legalParams = "";
    params = params ? params : "";

    if (typeof(params) === "string")
    {
      legalParams = params;
    }
    else if (typeof(params) === "object")
    {
      try
      {
        legalParams = "JSON=" + params.toJSONString();
      }
      catch (ex)
      {
        alert("Can't stringify JSON!");
        return false;
      }
    }
    else
    {
      alert("Invalid parameters!");
      return false;
    }

    if (this.debugging.isDebugging)
    {
      var lf = this.debugging.linefeed,
      info = "[Original Parameters]" + lf + params + lf + lf
      + "[Parsed Parameters]" + lf + legalParams;

      this.displayDebuggingInfo(info, "param");
    }

    return legalParams;
  },

  /* *
  * 对返回的HTTP响应结果进行过滤。
  *
  * @public
  * @params   {mix}   result   HTTP响应结果
  * @return  返回过滤后的结果
  * @type string
  */
  preFilter : function (result)
  {
    return result.replace(/\xEF\xBB\xBF/g, "");
  },

  /* *
  * 对返回的结果进行格式化。
  *
  * @private
  * @return 返回特定格式的数据结果
  * @type mix
  */
  parseResult : function (responseType, xhr)
  {
    var result = null;

    switch (responseType)
    {
      case "JSON" :
        result = this.preFilter(xhr.responseText);
        try
        {
          result = result.parseJSON();
        }
        catch (ex)
        {
          throw this.filename + "/parseResult() error: can't parse to JSON.\n\n" + xhr.responseText;
        }
        break;
      case "XML" :
        result = xhr.responseXML;
        break;
      case "TEXT" :
        result = this.preFilter(xhr.responseText);
        break;
      default :
        throw this.filename + "/parseResult() error: unknown response type:" + responseType;
    }

    if (this.debugging.isDebugging)
    {
      var lf = this.debugging.linefeed,
      info = "[Response Result of " + responseType + " Format]" + lf
      + result;

      if (responseType === "JSON")
      {
        info = "[Response Result of TEXT Format]" + lf
        + xhr.responseText + lf + lf
        + info;
      }

      this.displayDebuggingInfo(info, "result");
    }

    return result;
  }
};

/* 定义两个别名 */
var Ajax = Transport;
Ajax.call = Transport.run;

if ( ! Object.prototype.toJSONString) {
    Array.prototype.toJSONString = function () {
	var a = ['['],
		b,
		i,
		l = this.length,
		v;

	function p(s) {

		if (b) {
		  a.push(',');
		}
		a.push(s);
		b = true;
	}

	for (i = 0; i < l; i ++) {
		v = this[i];
		switch (typeof v) {

		case 'undefined':
		case 'function':
		case 'unknown':
			break;

		case 'object':
			if (v) {
				if (typeof v.toJSONString === 'function') {
					p(v.toJSONString());
				}
			} else {
				p("null");
			}
			break;

		default:
			p(v.toJSONString());
		}
	}

	a.push(']');
	return a.join('');
  };

Boolean.prototype.toJSONString = function () {
	return String(this);
};

Date.prototype.toJSONString = function () {

	function f(n) {
		return n < 10 ? '0' + n : n;
	}
	return '"' + this.getFullYear() + '-' +
			f(this.getMonth() + 1) + '-' +
			f(this.getDate()) + 'T' +
			f(this.getHours()) + ':' +
			f(this.getMinutes()) + ':' +
			f(this.getSeconds()) + '"';
};

Number.prototype.toJSONString = function () {


	return isFinite(this) ? String(this) : "null";
};

Object.prototype.toJSONString = function () {
	var a = ['{'],
		b,
		k,
		v;

	function p(s) {

		if (b) {
			a.push(',');
		}
		a.push(k.toJSONString(), ':', s);
		b = true;
	}


for (k in this) {
	if (this.hasOwnProperty(k)) {
		v = this[k];
		switch (typeof v) {

		case 'undefined':
		case 'function':
		case 'unknown':
			break;

		case 'object':
			if (this !== window)
			{
			  if (v) {
				  if (typeof v.toJSONString === 'function') {
					  p(v.toJSONString());
				  }
			  } else {
				  p("null");
			  }
			}
			break;
		default:
			p(v.toJSONString());
		}
	}
}

	a.push('}');
	return a.join('');
};

(function (s) {


	var m = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"' : '\\"',
		'\\': '\\\\'
	};

	s.parseJSON = function (filter) {

		try {
			if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.
					test(this)) {

				var j = eval('(' + this + ')');

				if (typeof filter === 'function') {

					function walk(k, v) {
						if (v && typeof v === 'object') {
							for (var i in v) {
								if (v.hasOwnProperty(i)) {
									v[i] = walk(i, v[i]);
								}
							}
						}
						return filter(k, v);
					}

					j = walk('', j);
				}
				return j;
			}
		} catch (e) {

		// Fall through if the regexp test fails.

		}
		throw new SyntaxError("parseJSON");
	};

	s.toJSONString = function () {

	  var _self = this.replace("&", "%26");

	  if (/["\\\x00-\x1f]/.test(this)) {
		  return '"' + _self.replace(/([\x00-\x1f\\"])/g, function(a, b) {
			  var c = m[b];
			  if (c) {
				  return c;
			  }
			  c = b.charCodeAt();
			  return '\\u00' +
				  Math.floor(c / 16).toString(16) +
				  (c % 16).toString(16);
		  }) + '"';
	  }
	  return '"' + _self + '"';
	};
})(String.prototype);
}

Ajax.onRunning  = showLoader;
Ajax.onComplete = hideLoader;

/* *
 * 显示载入信息
 */
function showLoader()
{
  document.getElementsByTagName('body').item(0).style.cursor = "wait";

  if (top.frames['header-frame'])
  {
    top.frames['header-frame'].document.getElementById("load-div").style.display = "block";
  }
  else
  {
    var obj = document.getElementById('loader');

    if ( ! obj && process_request)
    {
      obj = document.createElement("DIV");
      obj.id = "loader";
      obj.innerHTML = process_request;

      document.body.appendChild(obj);
    }
  }
}

/* *
 * 隐藏载入信息
 */
function hideLoader()
{
  document.getElementsByTagName('body').item(0).style.cursor = "auto";
  if (top.frames['header-frame'])
  {
    setTimeout(function(){top.frames['header-frame'].document.getElementById("load-div").style.display = "none"}, 10);
  }
  else
  {
    try
    {
      var obj = document.getElementById("loader");
      obj.style.display = 'none';
      document.body.removeChild(obj);
    }
    catch (ex)
    {}
  }
}
/* $Id : utils.js 5052 2007-02-03 10:30:13Z weberliu $ */

var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != - 1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != - 1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != - 1);

var Utils = new Object();

Utils.htmlEncode = function(text)
{
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Utils.trim = function( text )
{
  if (typeof(text) == "string")
  {
    return text.replace(/^\s*|\s*$/g, "");
  }
  else
  {
    return text;
  }
}

Utils.isEmpty = function( val )
{
  switch (typeof(val))
  {
    case 'string':
      return Utils.trim(val).length == 0 ? true : false;
      break;
    case 'number':
      return val == 0;
      break;
    case 'object':
      return val == null;
      break;
    case 'array':
      return val.length == 0;
      break;
    default:
      return true;
  }
}

Utils.isNumber = function(val)
{
  var reg = /^[\d|\.|,]+$/;
  return reg.test(val);
}

Utils.isInt = function(val)
{
  if (val == "")
  {
    return false;
  }
  var reg = /\D+/;
  return !reg.test(val);
}

Utils.isEmail = function( email )
{
  var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

  return reg1.test( email );
}

Utils.isTel = function ( tel )
{
  var reg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;  //只允许使用数字-空格等

  return reg.test( tel );
}


Utils.isMobile = function ( mobile )
{
  var reg = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;

  return reg.test( mobile );
}

Utils.isZipCode = function(val)
{
  var reg =/^[1-9][0-9]{5}$/;
  return reg.test(val);
}

Utils.fixEvent = function(e)
{
  var evt = (typeof e == "undefined") ? window.event : e;
  return evt;
}

Utils.srcElement = function(e)
{
  if (typeof e == "undefined") e = window.event;
  var src = document.all ? e.srcElement : e.target;

  return src;
}

Utils.isTime = function(val)
{
  var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

  return reg.test(val);
}

Utils.x = function(e)
{ //当前鼠标X坐标
    return Browser.isIE?event.x + document.documentElement.scrollLeft - 2:e.pageX;
}

Utils.y = function(e)
{ //当前鼠标Y坐标
    return Browser.isIE?event.y + document.documentElement.scrollTop - 2:e.pageY;
}

Utils.request = function(url, item)
{
	var sValue=url.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"));
	return sValue?sValue[1]:sValue;
}

Utils.$ = function(name)
{
    return document.getElementById(name);
}

function rowindex(tr)
{
  if (Browser.isIE)
  {
    return tr.rowIndex;
  }
  else
  {
    table = tr.parentNode.parentNode;
    for (i = 0; i < table.rows.length; i ++ )
    {
      if (table.rows[i] == tr)
      {
        return i;
      }
    }
  }
}

document.getCookie = function(sName)
{
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
      return decodeURIComponent(aCrumb[1]);
  }
  return null;
}

document.setCookie = function(sName, sValue, sExpires)
{
  var sCookie = sName + "=" + encodeURIComponent(sValue);
  if (sExpires != null)
  {
    sCookie += "; expires=" + sExpires;
  }

  document.cookie = sCookie;
}

document.removeCookie = function(sName,sValue)
{
  document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
}

function getPosition(o)
{
    var t = o.offsetTop;
    var l = o.offsetLeft;
    while(o = o.offsetParent)
    {
        t += o.offsetTop;
        l += o.offsetLeft;
    }
    var pos = {top:t,left:l};
    return pos;
}

function cleanWhitespace(element)
{
  var element = element;
  for (var i = 0; i < element.childNodes.length; i++) {
   var node = element.childNodes[i];
   if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
     element.removeChild(node);
   }
}