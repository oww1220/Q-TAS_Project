/**
* @author nurungso@paran.com
*/


function addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}


Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


/**
* 배경을 검은색으로 변환 
* @param {Object} onoff
*/

function dispBackgroundDark(onoff) {
    if (onoff == "on") {
        $('body').append('<div class="bg_dark"> </div> ');
        $('.bg_dark').css({
            'width': '100%',
            'height': $(document).height()
        });
    }
    else {
        $('.bg_dark').css({
            'width': '0px',
            'height': '0px'
        });
        $('.bg_dark').remove();
    }
}


/**
* Show Dialog .
* @param {Object} msg
* @param {Object} d_width
* @param {Object} title
* @param {Object} button_subject
*
*/
function ShowMessageBox() {
    //	msg,d_width,title

    var len = arguments.length;

    var msg;
    var d_width;
    var title;
    var button_subject
    var button_options = new Object();


    if (len > 1) {
        d_width = arguments[1];
    }
    else {
        d_width = 300;
    }

    if (len > 2) {
        title = arguments[2];
    }
    else {
        title = 'Title ';
    }

    if (len > 3) {

        if (typeof (arguments[3]) == 'object') {

            var v_list = new Object();
            v_list = arguments[3];

            for (var n in v_list) {
                button_options[n] = v_list[n];
            }

        } else if (arguments[3] == "no_button") {

        }
        else {
            button_options[arguments[3]] = function () {
                $(this).dialog('close');
            };
        }

    }
    else {
        button_options["OK"] = function () {
            $(this).dialog('close');

        };
    }

    if ($('#dialog').size() == 0) {
        $(' <div id="dialog" style="z-index:99"><span class="ui-icon ui-icon-circle-check" style="float:left; "></span><div style="margin:0 7px 0px 28px;">Message<div></div>	').appendTo(document.body);
        $('#dialog').dialog({ autoOpen: false, modal: true });        
    }

    $('#dialog div').html(arguments[0]);
    $('#dialog div p').css("margin", "5px 0 5px 0");

    $("#dialog").dialog("option", "title", title);
    $("#dialog").dialog("option", "width", d_width);
    $("#dialog").dialog("option", "buttons", button_options);

    $('#dialog').dialog('close');
    $('#dialog').dialog('open');



}


function CloseMessageBox() {
    $('#dialog').dialog('close');
}

/**
* 동적으로 스크립트 load
* @param {Object} url
*/
function setDynamicScriptAdd(url) {
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.src = url;
    $('head')[0].appendChild(c);
}

/**
* 동적으로 CSS Load
* @param {Object} url
*/
function setDynamicCssAdd(url) {
    var c = document.createElement('link');
    c.type = 'text/css';
    c.rel = 'stylesheet';
    c.href = url;
    $('head')[0].appendChild(c);

}


/**
* small helper function to urldecode strings
*/
jQuery.urldecode = function (x) {
    return decodeURIComponent(x).replace(/\+/g, ' ');
}



/**
* small helper function to urlencode strings
*/
jQuery.urlencode = encodeURIComponent;


/**
* This function returns the parsed url parameters of the
* current request. Multiple values per key are supported,
* it will always return arrays of strings for the value parts.
*/
jQuery.getQueryParameters = function (s) {
    if (typeof s == 'undefined')
        s = document.location.search;
    var parts = s.substr(s.indexOf('?') + 1).split('&');
    var result = {};
    for (var i = 0; i < parts.length; i++) {
        var tmp = parts[i].split('=', 2);
        var key = jQuery.urldecode(tmp[0]);
        var value = jQuery.urldecode(tmp[1]);
        if (key in result)
            result[key].push(value);
        else
            result[key] = [value];
    }
    return result;
}

/**
* small function to check if an array contains
* a given item.
*/
/*
jQuery.contains = function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item)
            return true;
    }
    return false;
}
*/


$.fn.setRadio = function (val) {
    return this.each(function () {
        if (this.value == val) {
            this.checked = true;
        }
    });
}



$.fn.setCheckBox = function (val) {

    var val_array = val.split(';');

    return this.each(function () {
        for (i = 0; i < val_array.length; i++) {

            if (this.value == val_array[i]) {
                this.checked = true;
            }
        }

    });
}


$.fn.getVals = function () {
    var re_val = "";
    this.each(function () {
        if (this.value != "") {
            if (re_val != "") { re_val = re_val + "," + this.value; }
            else { re_val = this.value }

        }
    });
    return re_val; 
}


function checkNumberOnly() {
    if (((event.keyCode < 48) || (event.keyCode > 57))) {
        event.returnValue = false;
    }
}

/*
* 날자 체크  yyyy-mm-dd
*/

$.fn.chkDate = function () {
    var str;

    this.each(function () {
        str = this.value;

    });

    var input = str.replace(/-/g, "");
    var inputYear = input.substr(0, 4);
    var inputMonth = input.substr(4, 2) - 1;
    var inputDate = input.substr(6, 2);
    var resultDate = new Date(inputYear, inputMonth, inputDate);

    if (resultDate.getFullYear() != inputYear || resultDate.getMonth() != inputMonth || resultDate.getDate() != inputDate) {

        return  false;
    }
    return true;
}


//!< 메일 체크

$.fn.checkMail = function (val) {

    var pattern = /^[^@ ]+@([a-zA-Z0-9-]){1,62}[a-zA-Z0-9]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;

    var check = false; 

    this.each(function () {
        if (pattern.test(this.value)) check = true;
    });

    return check;
}


//!< 영문 대소문자 및 숫자 체크 

$.fn.ValidateStr = function (val, min_length, max_length) {
    var patten = /^[A-Za-z0-9]{min_length,max_length}$/;

    var check = false;

    this.each(function () {
        if (pattern.test(this.value)) check = true;
    });
    return check;
}


//!< 문자 길이 체크

$.fn.ValidateLength = function () {
    var len = arguments.length;
    min_length = arguments[0];
    var check = false;

    this.each(function () {

        var str = $.trim(this.value);

        if (len > 1) {
            max_length = arguments[1];
            if (str.length <= max_length) check = true;
        }
        if (str.length >= min_length) {
            check = true;
        }

    });

    return check;

}

//!< 특수 문자 막기 
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function (e) { return d[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p } ('(2($){$.c.f=2(p){p=$.d({g:"!@#$%^&*()+=[]\\\\\\\';,/{}|\\":<>?~`.- ",4:"",9:""},p);7 3.b(2(){5(p.G)p.4+="Q";5(p.w)p.4+="n";s=p.9.z(\'\');x(i=0;i<s.y;i++)5(p.g.h(s[i])!=-1)s[i]="\\\\"+s[i];p.9=s.O(\'|\');6 l=N M(p.9,\'E\');6 a=p.g+p.4;a=a.H(l,\'\');$(3).J(2(e){5(!e.r)k=o.q(e.K);L k=o.q(e.r);5(a.h(k)!=-1)e.j();5(e.u&&k==\'v\')e.j()});$(3).B(\'D\',2(){7 F})})};$.c.I=2(p){6 8="n";8+=8.P();p=$.d({4:8},p);7 3.b(2(){$(3).f(p)})};$.c.t=2(p){6 m="A";p=$.d({4:m},p);7 3.b(2(){$(3).f(p)})}})(C);', 53, 53, '||function|this|nchars|if|var|return|az|allow|ch|each|fn|extend||alphanumeric|ichars|indexOf||preventDefault||reg|nm|abcdefghijklmnopqrstuvwxyz|String||fromCharCode|charCode||alpha|ctrlKey||allcaps|for|length|split|1234567890|bind|jQuery|contextmenu|gi|false|nocaps|replace|numeric|keypress|which|else|RegExp|new|join|toUpperCase|ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('|'), 0, {}));

//!< 숫자이면 true ;

$.fn.ValidateIsNumber = function () {

    var patten = /[0-9.]/;
    var str;
    this.each(function () {
        str = this.value;
    });
 
    return patten.test(str);
}


//!< 한글 체크 

$.fn.ValidateIsHangul = function () {

    checkStr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;

    var check = false;
    this.each(function () {
        if (checkStr.test(this.value)) check = true;
    });
    return check;


}


//!< 아이피 체크 

$.fn.ValidateIsIp = function () {

    var check = false;
    var checkStr = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;

    this.each(function () {
        if (checkStr.test(this.value)) check = true;
    });
    return check;

}

$.fn.ValidateXYCheck = function () {

    var expXY = /^[0-9]{1,10}(\.[0-9]{1,6})?$/i;
    var check = false;
    var val;
    this.each(function () {
        val = this.value; 
    });

    return expXY.test(val);

}


//!< 정상적인 url 체크 

function ValidateCheckUrl(strUrl) {
    var expUrl = /^(http\:\/\/)?((\w+)[.])+(asia|biz|cc|cn|com|de|eu|in|info|jobs|jp|kr|mobi|mx|name|net|nz|org|travel|tv|tw|uk|us)(\/(\w*))*$/i;
    return expUrl.test(strUrl);
}




//!< 바이트 문자 숫자 얻기 
function getByteLength(str) {
    var len = 0;

    if (str == null)
        return 0;

    for (var i = 0; i < str.length; i++) {
        var c = escape(str.charAt(i));
        if (c.length == 1) len++;
        else if (c.indexOf("%u") != -1) len += 2;
        else if (c.indexOf("%") != -1) len += c.length / 3;
    }

    return len;
}



/*
랜덤 실수 발생기 
*/
function GenRandom(num) {
    return Math.random() * num;
}


/*
페이지 이동 
*/

function MoveToPage(link) {
    top.location.href = link + "?refresh=" + GenRandom(100);
}


function DateCShap(val) {

    var s = val.replace("/Date(", "");
    s = s.replace(")/"); 

    return new Date(parseInt(s));
}






function PopUpWindows(url, width, height) {

    window.open(url, "_blank", "width=" + width + ",height=" + height + ",scrollbars=auto");
}


/**
에러 체크 클래스 : jquery 필요함 
**/

function nrsValidater() {
   
    this.msg = "";
    this.error_length = 0;
   
    this.msg_type_1 = "를(을) 입력해 주세요."; 
    this.msg_type_2 = "를(을) 좌표 포맷으로 입력해 주세요."; 
    this.msg_type_3 = " 날짜의 입력을 YYYY-MM-DD 형식으로 입력해 주세요."; 
    this.msg_type_4 = "를(을) 숫자로 입력해 주세요."; 
    this.msg_type_5 = "를(을) IP xxx.xxx.xxx.xxx 형식으로 입력해 주세요.";

    this.Clear = function () {
        this.msg = ""; 
        this.error_length = 0 ; 
    }


    this.ValueCheck = function (selector, subject, check_type, indispensable) {
        var val = $(selector).val();

        val = $.trim(val); 

        //null  check 
        if (val.length == 0 || val == null || val == "") {

            if (indispensable) {
                this.msg = this.msg + subject + this.msg_type_1 + "<p/>";
                this.error_length++;
                return;
            }

        }
        else {
            if (check_type == "date") {
                //!< 날짜 포맷 체크 
                if (!$(selector).chkDate()) {
                    this.msg = this.msg + subject + this.msg_type_3 + "<p/>";
                    this.error_length++;
                }

            }

            else if (check_type == "number") {
                //!< 날짜 포맷 체크 
                if (!$(selector).ValidateIsNumber()) {
                    this.msg = this.msg + subject + this.msg_type_4 + "<p/>";
                    this.error_length++;
                }

            }

            else if (check_type == "ip") {
                //!< 날짜 포맷 체크 
                if (!$(selector).ValidateIsIp()) {
                    this.msg = this.msg + subject + this.msg_type_5 + "<p/>";
                    this.error_length++;
                }

            }

            else if (check_type == "XY") {
                //!< 날짜 포맷 체크 
                if (!$(selector).ValidateXYCheck()) {
                    this.msg = this.msg + subject + this.msg_type_2 + "<p/>";
                    this.error_length++;
                }

            }

        }

    }

}


//!< cookie 

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}



//!< 공통 처리
$(function () {
    $('A').focus(function () {
        $(this).blur();
    });
});
