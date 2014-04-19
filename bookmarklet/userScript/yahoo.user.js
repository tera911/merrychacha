// ==UserScript==
// @name	ヤフーのパスワードを入れるやつ
// @description	ヤフーのパスワードを入れるやつ
// @match	https://login.yahoo.co.jp/config/login*
// ==/UserScript==

(function(){
	var username = document.querySelector('#username > span');
	var password = document.querySelector('#passwd');
	switch(username.innerText){
		case "yukiaki_2222":
			password.value = "kae0811";
		break;
	}
})();