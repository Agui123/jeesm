$(function(){ 
		var $cart=$("#cart");
		var $cBox=$cart.find("input[type='checkbox']");
		var $cLi=$cart.find(".r-c-td");
		var $num=$("#selectedTotal");
		var $price=$(".p-price");
		var $v=$(".count_input");
		var $total=$(".p-sum");
		var $cell=$(".check-one");
		var $balance=$("#priceTotal");
		var $keyNum=$("#cart .count_input");
		var $closing=$(".closing");
		var $deleteAll=$("#deleteAll");
		var $selectedViewList=$("#selectedViewList");
		var $arrow=$(".arrow");
		var $selected_view=$(".selected_view");
		var mm={
			num:0,
			price:0,
			HTMLstr:'',
			cShop:function(ll,seclectNum){
				this.num=0;     //每次执行前归零

				for(var i=0;i<ll.length;i++){
					if(ll[i].checked==true){
						ll[i].parentNode.parentNode.parentNode.style.backgroundColor="#fffdfb"; 
						this.num+=1;
					}else{ 
						ll[i].parentNode.parentNode.parentNode.style.backgroundColor="";
						

						
					}

				};
				seclectNum.html(this.num);

			},
			initSum:function(util,price,v,total){
				for(var i=0;i<util.length;i++){
					var p=parseFloat(price[i].innerHTML);
					var vv=parseInt(v[i].value);
					total[i].innerHTML=(p*vv).toFixed(2);

				} 

			},
			getTotal:function(util,total,balance,view){ 
				this.price=0;
				this.HTMLstr='';
				for(var i=0;i<util.length;i++){
					if(util[i].checked==true){
						this.price+=Number(total[i].innerHTML);
						this.HTMLstr+='<li><a href="javascript:;"><img src="' + util.eq(i).parent().siblings().find("img").attr("src") + '"></a></li>';

					}


				}
				
				balance.html(this.price.toFixed(2));
				view.html(this.HTMLstr);
				jQuery(".picScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",vis:9});

			},
			delShop:function(util){ 
				for(var i=0;i<util.length;i++){
					if(util[i].checked==true){
						var rec_id=$(util[i]).val();
						$.post('flow.php?step=drop_goods',{rec_id:rec_id},function(msg){
						},'json');
						util[i]. parentNode.parentNode.parentNode.remove();
					}
				}
			}
		};
		
		
		
		$cBox.click(function(e){
			if($(e.target).hasClass("all-check")){
				if($(e.target).is(":checked")){
					for(var i=0;i<$cBox.length;i++){
						$cBox[i].checked=true;

					}
					mm.cShop($cell,$num);
					mm.getTotal($cell,$total,$balance,$selectedViewList);

				}else{ 
					for(var k=0;k<$cBox.length;k++){
						$cBox[k].checked=false;

					}
					mm.cShop($cell,$num);
					mm.getTotal($cell,$total,$balance,$selectedViewList);

				}

			}else{ 
				if(!$(e.target).is(":checked")){
					 for(var p=0;p<$cBox.length;p++){
						if($cBox[p].className.indexOf("all-check")>=0){
							 $cBox[p].checked=false;

						} 

					}

				}
				mm.cShop($cell,$num);
				mm.getTotal($cell,$total,$balance,$selectedViewList);
				
			}
		});
		$cLi.click(function(e){ 
			var cls=$(e.target).attr("class");
			var v=$(e.target).siblings("input[type='text']");
			var pv=parseInt(v.val());
            
			switch(cls){
				case 'add':
					v.val(pv+1);
					mm.initSum($cell,$price,$v,$total);
					$cell=$(".check-one");
					$total=$(".p-sum");
					$balance=$("#priceTotal");
			        mm.getTotal($cell,$total,$balance,$selectedViewList);

					var goods_id=$(e.target).parent().find('.rec_id').val();
					var num=$(e.target).parent().find('.count_input').val();
					var goods_number='goods_number['+goods_id+']';
				//	$.get("flow.php?step=update_cart&"+goods_number+"="+num);
		
					$.get("flow.php?step=update_cart&"+goods_number+"="+num,"",function(data){
						//$("#youfei").html(data.shipping_fee);
						if(data.msg != "" && data.msg != 'null'){
							alert(data.msg);	
							window.location.reload();
						}
						autoCount()
						},"json");
						
				break;
				case 'reduce':
					if(pv>1){

						v.val(pv-1);
						mm.initSum($cell,$price,$v,$total,$selectedViewList);
						$cell=$(".check-one");
					    $total=$(".p-sum");
					    $balance=$("#priceTotal");

						var goods_id=$(e.target).parent().find('.rec_id').val();
						var num=$(e.target).parent().find('.count_input').val();
						var goods_number='goods_number['+goods_id+']';
						//$.get("flow.php?step=update_cart&"+goods_number+"="+num);
						$.get("flow.php?step=update_cart&"+goods_number+"="+num,"",function(data){
							//$("#youfei").html(data.shipping_fee);
							if(data.msg != "" && data.msg != 'null'){
								alert(data.msg);	
								window.location.reload();
							}
							autoCount()
							},"json");
					    mm.getTotal($cell,$total,$balance);
					}
				break;
				case 'delete-img':
					// var con=
					if(confirm("确定删除此商品？")){
						var rec_id=$(this).parent().find('.rec_id').val(); //获取要删除的id
						$.post('flow.php?step=drop_goods',{rec_id:rec_id},function(msg){
							if(msg['success']==1){
								$(e.target).parent().parent().parent().remove();
								$cell=$(".check-one");
								$total=$(".p-sum");
								$balance=$("#priceTotal");

								mm.cShop($cell,$num);
								mm.getTotal($cell,$total,$balance,$selectedViewList);
							}else{
								alert('删除失败');
							}
						},'json');
					}
				break;

			}
		});
		/*初始化价格*/
		mm.initSum($cell,$price,$v,$total);
		/*keyup数量*/
		$keyNum.keyup(function(){ 
			var val = parseInt($(this).val());
			 if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
          mm.initSum($cell,$price,$v,$total);
          $cell=$(".check-one");
		  $total=$(".p-sum");
		  $balance=$("#priceTotal");
          mm.getTotal($cell,$total,$balance,$selectedViewList);
            
			 
		});
		(function(){ 
			mm.cShop($cell,$num);
			/*总价格*/
			mm.getTotal($cell,$total,$balance,$selectedViewList);
		})();
		/*判断是否勾选*/
		$closing.click(function(){
			if(Number($num.html())==0){
				alert("请至少选中一件商品！"); 

			}else{
				//结算
				var id_arr=new Array();
				for (var i = 0; i < $cell.length; i++) {
					// 如果被选中，就添加到数组中
					if ($('.check-one').eq(i).attr('checked') == 'checked') {
						var rec_id=$('.check-one').eq(i).val();
						id_arr.push(rec_id);
					}
				}
				location.href="flow.php?step=checkout&id_list="+escape(id_arr);

			}
		})
			
		/*删除所选中的商品*/
		$deleteAll.click(function(){
			if(Number($num.html())==0){
				alert("请至少选中一件商品！"); 

			}else{ 
				if(confirm("确定删除所选中的商品？")){ 
					$cell=$(".check-one");
					$total=$(".p-sum");
					$balance=$("#priceTotal");
					mm.delShop($cell);

				}else{ 
					return;
				}
				$cell=$(".check-one");
				$total=$(".p-sum");
				$balance=$("#priceTotal");
				mm.cShop($cell,$num);
				mm.getTotal($cell,$total,$balance,$selectedViewList);
				
			}
		});
		/*显示banner*/
		$arrow.click(function(){ 
			if(Number($num.html())>0){
				
				if($selected_view.css("opacity")=="0"){
					$(this).addClass("arrowrotate");
					$selected_view.css("opacity",1);
					


				}else{ 
					$(this).removeClass("arrowrotate");
					$selected_view.css("opacity",0);
				}

			}
		});
		
})