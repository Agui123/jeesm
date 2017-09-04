$(function(){
function autoCount(){
	var $table=$('.table');
	var $tableOrder=$table.find('.dhorder');
	var $tableOrderTr=$tableOrder.find("tr");
	var $uPrice=0;
	var $uTotal=0;
	var vl;
	var t1=0;
	var t=$tableOrderTr.find('.u-t-price');
	
	for(var i=0;i<$tableOrderTr.length;i++){
		$uPrice=$tableOrderTr.eq(i).find(".u-price").html();
		vl=$tableOrderTr.eq(i).find("input").val();
		$uTotal=(parseFloat($uPrice)*parseInt(vl)).toFixed(2);
		t.eq(i).html($uTotal);
		t1+=parseFloat($uTotal);
		
	}
	$("#payqian").html(t1.toFixed(2));

	needPayTotal();
	
}
autoCount();
$(".table .dhorder input").keyup(function(){
	var val=parseInt($(this).val());
	if (isNaN(val) || val <= 0) {
        val = 1;
    }
    if (this.value != val) {
        this.value = val;
    }
	id_list = $("input[name='id_list']").val();
	payid = $("input[name='payment']:checked").val();
	var goods_id=$(this).parent().find('.rec_id').val();
	var goods_number='goods_number['+goods_id+']';
	//$.get("flow.php?step=update_cart&payid="+payid+"&"+goods_number+"="+val);
	
			$.get("flow.php?step=update_cart&payid="+payid+"&id_list="+id_list+"&"+goods_number+"="+val,"",function(data){
//	$.get("flow.php?step=update_cart&payid="+payid+"&"+goods_number+"="+val,"",function(data){
		$("#youfei").html(data.shipping_fee);
		if(data.msg != "" && data.msg != 'null'){
			alert(data.msg);	
			window.location.reload();
		}
		autoCount()
	},"json");
	
    autoCount();
})
$(".table .dhorder tr").click(function(e){
	var e=e || window.event;
	var el=e.target || e.srcElement;
	var cls = el.className;
	var countInout=$(e.target).siblings("input[type='text']");
    var value=parseInt(countInout.val());
	var payid = $("input[name='payment']:checked").val();
    switch(cls){
    	case 'con-s-add':
			countInout.val(value+1);
			var id_list = $("input[name='id_list']").val();

			var goods_id=$(e.target).parent().find('.rec_id').val();
			var num=$(e.target).parent().find('.count_input').val();
			var goods_number='goods_number['+goods_id+']';
			$.get("flow.php?step=update_cart&payid="+payid+"&id_list="+id_list+"&"+goods_number+"="+num,"",function(data){
				$("#youfei").html(data.shipping_fee);
				if(data.msg != "" && data.msg != 'null'){
					alert(data.msg);	
					countInout.val(value);
				}
				autoCount()
				},"json");

			autoCount();
		break;

		case 'con-s-subtract':
			if(value>1){ 
				countInout.val(value-1);
			var id_list = $("input[name='id_list']").val();

				var goods_id=$(e.target).parent().find('.rec_id').val();
				var num=$(e.target).parent().find('.count_input').val();
				var goods_number='goods_number['+goods_id+']';
			$.get("flow.php?step=update_cart&payid="+payid+"&id_list="+id_list+"&"+goods_number+"="+num,"",function(data){
				$("#youfei").html(data.shipping_fee);
				if(data.msg != "" && data.msg != 'null'){
					alert(data.msg);
					countInout.val(value);	
				}
				autoCount()
				},"json");
				autoCount();
			}
			autoCount();
		break;
    }
});
function needPayTotal(){
	var pt=0;
	var py=0;
	pt=Number($("#payqian").html());
	py=Number($("#youfei").html());
	$("#needPay").html(pt+py);
	
	
}
})