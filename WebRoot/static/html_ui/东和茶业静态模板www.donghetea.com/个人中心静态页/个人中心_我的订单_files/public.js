$(function(){
	// 图片缓存加载
	$(".publish input.addpicture").change(function(e){
		var fr=new FileReader();
		fr.readAsDataURL(this.files[0]);
		fr.onload=function(){		
			var oImg=new Image();
			oImg.src=fr.result;//图片的dataURL
			oImg.onload=function(){
				$(".publish img.addpicture").eq($(e.target).index()-1).attr("src",oImg.src);
			}
		}
	});
	$(".publish input#addpicture").change(function(){
		// console.log($(".publish input#addpicture").val());
		for (var i = 0; i < $(".publish input.addpicture").length; i++) {
			if ($(".publish input.addpicture").eq(i).val() == '') {
				
				return;
			}
		}
	});
	// 订单确认框
	$("#orderbox input.changenum").click(function(e){
		var num = $("#orderbox .num").val()?parseInt($("#orderbox .num").val()):0;	
		var max = 	 $("#orderbox .num").attr('max')?parseInt($("#orderbox .num").attr('max')):9999;
		if (this.value == '+' &&num<max) {
			$("#orderbox .num").val(num+1);
		} else if (this.value == '-' &&num !=0) {
			$("#orderbox .num").val(num-1);
		}
		if (isNaN(parseInt($("#orderbox .price").html()))) {
			return ;
		}
		// $("#orderbox .total").html(500);
		$("#orderbox .total").html(parseInt($("#orderbox .num").val()) * parseInt($("#orderbox .price").html())+"元");
	});
	$("#orderbox .num").change(function(){
		$("#orderbox .total").html(parseInt($("#orderbox .num").val()) * parseInt($("#orderbox .price").html())+"元");		
	});
	$("#orderbox .num").keyup(function(){
		$("#orderbox .total").html(parseInt($("#orderbox .num").val()) * parseInt($("#orderbox .price").html())+"元");
	});
	$("#orderbox .revamp").click(function(){
		$("span.site").hide();
		$("input.site").show();
	});
	// 倒计时
});
function Countdown(sec){
	var sec= Number(sec);
	var Day=parseInt(sec/(24*60*60))  ;
		sec-=Day*24*60*60;
	var H=parseInt(sec/(60*60));
		sec-=H*60*60;
	var M=parseInt(sec/60);
		sec-=M*60;
	var time="<span><var>"+Day+"</var><em>天</em><var>"+H+"</var><em>时</em><var>"+M+"</var><em>分</em><var>"+sec.toFixed(1)+"</var><em>秒</em></span>";
	return time;
}