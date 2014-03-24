<html>
<head>
<meta charset=utf-8>
<script src="http://code.jquery.com/jquery-1.11.0.min.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function(){
		var storage = localStorage;
		//カーソルが離れた時にstoreに保存する。
		$('td').blur(function(){
				//indexを取得する
				var index = $(this).parent().children('td').index(this);
				var itemId = $(this).parent().children('td:nth-child(2)').text();
				var key = itemId + "-" + index;
				var text = $($(this).parent().children('td')[index]).html();
				if(index != 3){
					storage.setItem(key, text);
				}
		});
		//ページを開いたときにデータをロードする.
		function dataLoad(){
			$('td:nth-child(2)').each(function(){
				var itemId = $(this).text();
				if(itemId == ""){
					return;
				}
				for(i = 0; i < 7; i++){
					var text = storage.getItem(itemId + "-" + i);
					if(text != null){
						$($(this).parent().children()[i]).html(text);
					}
				}
			});
		}
		dataLoad();
	});
</script>
<style>
table{
	border:0px solid #000;
	border-collapse: collapse;
	width:750px;
	height:1060px;
	page-break-after:always;
	margin-bottom:30px;
	table-layout:fixed;
}
td{
	border:1.5px solid #000;
	margin:0;
	text-align:center;
}
tr{
	height:12.5%;
}
td:nth-child(1){
	width:60px;
	font-size: 0.9em;
}
td:nth-child(2){
	width:115px;
	font-size:1.5em;
}
td:nth-child(3){
	width:130px;
	padding:2px 10px;
}
td:nth-child(4){
	width:225px;
	text-align:left;
	padding:0 0 0 25px;
}
td:nth-child(5){
	width:75px;
}
td:nth-child(6){
	width:75px;
}
td:nth-child(7){
	width:65px;
	border:0;
}
td > span{
	color:#AAA;
	width: 10px;
	margin: 2px;
	padding: 3px 6px;
	/* height: 20px; */
	display: block;
	float: left;
	border-radius: 32px;
	border: 2px solid #CCC;
}
</style>
</head>
<body>
