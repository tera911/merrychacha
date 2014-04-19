javascript:void(function(){
if(document.domain.match(/store.yahoo.co.jp/) == null){
	return;
}
var searchUrl = "http://store.shopping.yahoo.co.jp/chachamerry/search.html?p=";
var text = window.prompt("検索するワードを入力してください");

//var text = "(かばん)";
searchUrl = searchUrl + encodeURI('('+text+')');
//Ajaxで取得
var req = new XMLHttpRequest();
req.open("GET", searchUrl ,false);
req.send();
//取得したデータからDOM構築
var d = document.createElement('html');
d.innerHTML = req.responseText;
Array.prototype.forEach.call(document.querySelectorAll('input[name^=hotitem]'), function(e){e.value = ""});
Array.prototype.forEach.call(d.querySelectorAll('.ptData > p > a'), function(e, i){
	var itemid = e.href.match(/[0-9]{3,4}-+[0-9]|[0-9]{3,4}/)[0];
	var existItem = e.parentNode.querySelector('span > b');
	existItem = existItem== null ? "" : existItem.innerHTML ;
	document.querySelectorAll('[name^=hotitem]')[i].value = existItem + itemid;
	if(i > 20){
		return;
	}
});
})();