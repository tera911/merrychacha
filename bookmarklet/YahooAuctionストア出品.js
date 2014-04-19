javascript:void(function(){

if(document.querySelector('.decBg04') == null){
	return;
}

loadjs("//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
loadjs("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js");
loadcss("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css");

/* init */
function init(){
	$('#price_mode_auc').click();
	$('#start_price').val("");
	$('#buy_price').val("");
	$('input[name=quantity]').val(20);
	$('#use_ship_fee').click();
	$('input[name=ship_fee_B1]').attr('checked',true);
	$('input[name=cod_fee]:first').click();
	init2();
}
function init2(){
  var dialogBox = $('<div id="dialog-form"><form><table id="form1" class="sample"><tr><td><label>���i�ԍ�</label><input type="text" class="number" name="number" value="" size="10" maxlength="4"></td></tr><tr><td><label>�^�C�g��</label><input type="text" class="title" name="title" value="" size="60"></td></tr><tr><td><label>����</label><textarea class="description" name="description" value="" cols="60" rows="10"></textarea></td></tr><tr><td><label>���i</label><input type="text" class="price" name="price" value="" size="10" maxlength="10"><label>����</label><input type="text" class="buy_price" name="buy_price" value="" size="10" maxlength="10"></td></tr><tr><td><label>�X�g�A������</label><select name="category" class="category"><option>���f�B�[�X�t�@�b�V����</option><option>���f�B�[�X�t�@�b�V����.�o�b�O</option><option>���f�B�[�X�t�@�b�V����.�����E�G��</option><option>���f�B�[�X�t�@�b�V����.�C�E�T���_��</option><option>���f�B�[�X�t�@�b�V����.���z</option><option>���f�B�[�X�t�@�b�V����.���E�R�[�g</option><option>�����Y�t�@�b�V����</option><option>�����Y�t�@�b�V����.�o�b�O</option><option>�����Y�t�@�b�V����.�����E�G��</option><option>�����Y�t�@�b�V����.���z</option><option>�����Y�t�@�b�V����.�L�[�P�[�X</option><option>�����Y�t�@�b�V����.�C�E�T���_��</option><option>�����Y�t�@�b�V����.�r�W�l�X�o�b�O</option><option>�A�N�Z�T���[�E�r���v</option><option>�A�N�Z�T���[�E�r���v.�u���X���b�g</option><option>�A�N�Z�T���[�E�r���v.�l�b�N���X</option><option>�A�N�Z�T���[�E�r���v.�r���v</option><option>�A�N�Z�T���[�E�r���v.���v�P�[�X</option><option>�A�N�Z�T���[�E�r���v.�s�A�X</option><option>�A�N�Z�T���[�E�r���v.�w��</option><option>�A�N�Z�T���[�E�r���v.UZU/�E�Y</option><option>���e�E���N</option><option>���e�E���N.���N�E�g���[�j���O�@��</option><option>���e�E���N.���N�H�i</option><option>�Ɠd�EAV�@��</option><option>�Ɠd�EAV�@��.�L�b�`���Ɠd</option><option>�Ɠd�EAV�@��.�����Ɠd</option><option>�Ɠd�EAV�@��.�I�[�f�B�I�Ɠd</option><option>�Ɠd�EAV�@��.�Ɩ��@��</option><option>�Ɠd�EAV�@��.DIY�H��</option><option>�Ɠd�EAV�@��.�X�}�[�g�t�H���P�[�X</option><option>���p�i�G��</option><option>���p�i�G��.�L�b�`���p�i</option><option>���p�i�G��.�|���p��</option><option>���p�i�G��.�h�ƃO�b�Y</option><option>���p�i�G��.���p�i�G��</option><option>���p�i�G��.�w�A�P�A�p�i</option><option>�C���e���A</option><option>�J�[�E���]�ԗp�i</option><option>�ߋ�</option><option>�M�t�g</option></select></td></tr></table></form></div>');
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

function loadjs(url){
    d = document.createElement('script');
    d.src = url;
    d.type = "text/javascript";
    document.head.appendChild(d);

}
function loadcss(url){
    d = document.createElement('link');
    d.href = url;
    d.rel = "stylesheet";
    document.head.appendChild(d);
	d.onload = function(){
		init();
	}
}

})();