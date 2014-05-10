javascript:void(function(){

if(document.querySelector('.decBg04') == null){
	return;
}

loadjs("//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function(){
/* init */
	window.init_win = function($){
		console.log($);
		$('#price_mode_auc').click();
		$('#start_price').val("");
		$('#buy_price').val("");
		$('input[name=quantity]').val(20);
		$('#use_ship_fee').click();
		$('input[name=ship_fee_B1]').attr('checked',true);
		$('input[name=cod_fee]:first').click();
	}

	window.init_win(jQuery);
});

loadjs("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js", function(){
	window.init_win1 = function($){
	  var dialogBox = $('<div id="dialog-form"><form><table id="form1" class="sample"><tr><td><label>商品番号</label><input type="text" class="number" name="number" value="" size="10" maxlength="4"></td></tr><tr><td><label>タイトル</label><input type="text" class="title" name="title" value="" size="60"></td></tr><tr><td><label>説明</label><textarea class="description" name="description" value="" cols="60" rows="10"></textarea></td></tr><tr><td><label>価格</label><input type="text" class="price" name="price" value="" size="10" maxlength="10"><label>即決</label><input type="text" class="buy_price" name="buy_price" value="" size="10" maxlength="10"></td></tr><tr><td><label>ストア内検索</label><select name="category" class="category"><option>レディースファッション</option><option>レディースファッション.バッグ</option><option>レディースファッション.小物・雑貨</option><option>レディースファッション.靴・サンダル</option><option>レディースファッション.財布</option><option>レディースファッション.服・コート</option><option>メンズファッション</option><option>メンズファッション.バッグ</option><option>メンズファッション.小物・雑貨</option><option>メンズファッション.財布</option><option>メンズファッション.キーケース</option><option>メンズファッション.靴・サンダル</option><option>メンズファッション.ビジネスバッグ</option><option>アクセサリー・腕時計</option><option>アクセサリー・腕時計.ブレスレット</option><option>アクセサリー・腕時計.ネックレス</option><option>アクセサリー・腕時計.腕時計</option><option>アクセサリー・腕時計.時計ケース</option><option>アクセサリー・腕時計.ピアス</option><option>アクセサリー・腕時計.指輪</option><option>アクセサリー・腕時計.UZU/ウズ</option><option>美容・健康</option><option>美容・健康.健康・トレーニング機器</option><option>美容・健康.健康食品</option><option>家電・AV機器</option><option>家電・AV機器.キッチン家電</option><option>家電・AV機器.生活家電</option><option>家電・AV機器.オーディオ家電</option><option>家電・AV機器.照明機器</option><option>家電・AV機器.DIY工具</option><option>家電・AV機器.スマートフォンケース</option><option>日用品雑貨</option><option>日用品雑貨.キッチン用品</option><option>日用品雑貨.掃除用具</option><option>日用品雑貨.防犯グッズ</option><option>日用品雑貨.日用品雑貨</option><option>日用品雑貨.ヘアケア用品</option><option>インテリア</option><option>カー・自転車用品</option><option>玩具</option><option>ギフト</option></select></td></tr></table></form></div>');
		dialogBox.dialog({
			width:700,
			position:"top",
			buttons:{
				"OK":function(){
				$('#auc_merchant').val($('#dialog-form .number').val());
				$('textarea[name=Description_plain]').text('<CENTER><TABLE WIDTH=500><TR><TD><FONT color="#330000"><b>'+$('#dialog-form .title').val()+'</b></FONT><HR><TABLE CELLPADDING=15><TR><TD><FONT COLOR=#663300 SIZE=3>'+$('#dialog-form .description').val()+'</FONT></TD></TR></TABLE></TD></TR></TABLE></CENTER>');
				$('input[name=start_price]').val($('#dialog-form .price').val());
				$('input[name=buy_price]').val($('#dialog-form .buy_price').val());
				$('#auc_search_words').val($('#dialog-form .category').val());

				$(this).dialog('close');
				}
			}
		});
	}
	window.init_win1(jQuery);
});
loadcss("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css");



function loadjs(url, func){
    var d = document.createElement('script');
    d.src = url;
    d.type = "text/javascript";
	d.sync = false;
	d.onload = func;
    document.head.appendChild(d);
}
function loadcss(url){
    d = document.createElement('link');
    d.href = url;
    d.rel = "stylesheet";
    document.head.appendChild(d);
}

	
})();
