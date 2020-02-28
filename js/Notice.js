
function OnInsertComment() {
    if (confirm('의견 글을 남기시겠습니까?')) {
        AjaxService.DoWork(OnInsertBoardComment_CallBack);
        
    }
}

function OnInsertComment_CallBack(value) {
    if (value == "SUCCESS") {
        PageReload();
    }
    else if (value == "FAIL") {
        alert('댓글 등록을 실패했습니다.');
    }
    else if (value == "NOAUTH") {
        alert('로그인 하신 후 이용해 주세요.');
    }
    else {
        alert(value);
    }
}
