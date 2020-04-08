
function timeSt(dt) {
    var d = new Date(dt);
    var yyyy = d.getFullYear();
    var MM = d.getMonth() + 1;
    var dd = d.getDate();
    return (yyyy + '-' + addzero(MM) + '-' + addzero(dd));
}

function addzero(n) {
    return n < 10 ? "0" + n : n;
}


/*
' ------------------------------------------------------------------
' Function    : fn_chk_byte(aro_name)
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      : 
' ------------------------------------------------------------------
*/
function fn_chk_byte(aro_name, ari_max) {

    var ls_str = aro_name.value; // 이벤트가 일어난 컨트롤의 value 값
    var li_str_len = ls_str.length;  // 전체길이

    // 변수초기화
    var li_max = ari_max; // 제한할 글자수 크기
    var i = 0;  // for문에 사용
    var li_byte = 0;  // 한글일경우는 2 그밗에는 1을 더함
    var li_len = 0;  // substring하기 위해서 사용
    var ls_one_char = ""; // 한글자씩 검사한다
    var ls_str2 = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

    for (i = 0; i < li_str_len; i++) {
        // 한글자추출
        ls_one_char = ls_str.charAt(i);

        // 한글이면 2를 더한다.
        if (escape(ls_one_char).length > 4) {
            li_byte += 2;
        }
        // 그밗의 경우는 1을 더한다.
        else {
            li_byte++;
        }

        // 전체 크기가 li_max를 넘지않으면
        if (li_byte <= li_max) {
            li_len = i + 1;
        }
    }

    // 전체길이를 초과하면
    if (li_byte > li_max) {
        ShowMessageBox(li_max + 'byte를 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ', '350', '체크');
        ls_str2 = ls_str.substr(0, li_len);
        aro_name.value = ls_str2;
    }
    aro_name.focus();
}

<!-- 글자수 체크 -->
function SizeOfString(Str)
{
	var Add = 0;
	for (i=0; i<Str.length; i++) 
	{
		if( (Str.charCodeAt(i) < 0) || (Str.charCodeAt(i) > 127) ) 
		{
			Add = Add+1;
		}
	}
	return (Str.length + Add);
}

function onlyNumber() {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        return true;
    }
    else {
        event.returnValue = false;
    }
}

function AddComma(data_value) {
    var txtNumber = '' + data_value;

    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = txtNumber.split('.');

    arrNumber[0] += '.';

    do {
        arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
    }
    while (rxSplit.test(arrNumber[0]));

    if (arrNumber.length > 1) {
        return arrNumber.join('');
    }
    else {
        return arrNumber[0].split('.')[0];
    }
}

function SetComma(obj) {
    if (obj.value != "") {
        obj.value = Number(String(obj.value).replace(/\..*|[^\d]/g, '')).toLocaleString().slice(0, -3);
    }
}


/*------Q-tas 추가------*/
var QTAS = QTAS || {
    /*레이어팝업*/
    layer: {
        scrollTop: 0,
        
        /**
         * @param {string} layer 계산되어질 레이어
         */
		calculate: function(layer){
			var layer = $("." + layer),
				layerIn = layer.find(".pop_inner"),
                winH = $(window).height(),
                h3H = layerIn.find("h3").height(),
                winW = $(window).width();
                
                layerIn.find(".pop_scroll").removeAttr("style");

			var layerH = layer.height(),
				layerW = layer.width(),
				marginH = parseInt(layerIn.css("marginTop")) + parseInt(layerIn.css("marginBottom"));
			
			if(winH < layerH){
				layerIn.find(".pop_scroll").css({
					height: winH - marginH - h3H,
                    "overflow-y": "auto",
                    "overflow-x": "hidden",
				});
				layer.css({
					top: 0,
					left: (winW - layerW) / 2,
				});
			}
			else{
                layerIn.find(".pop_scroll").removeAttr("style");
				layer.css({
					top: (winH - layerH) / 2,
					left: (winW - layerW) / 2,
				});
            }

            if (winW < layerW) {
                layerIn.find(".pop_scroll").css({
					width: winW - marginH,
					"overflow-x": "auto",
                }); 
                layer.css({
					left: 0,
				});
            }

        },
        
        /**
         * @param {string} target 이벤트 대상 식별자
         * @param {string} dimmed 레이어 딤
         * @param {string} parent 대상 레이어
         * @param {function} callback 실행에 대한 콜백함수
         */
		open: function(target, dimmed, parent, callback){
			var that = this;
			$(document).on("click", target, function(e){
				var layer = $(this).data("layer");
				var targetDom = $(this);
				that.scrollTop = $(window).scrollTop();

				if(callback){
					callback(show, layer, targetDom);
				}
				else{
					show();
				}
				
				function show(){
					$("body").addClass("fixed");
				
					if(dimmed) $(dimmed).fadeIn();
					$(parent + "." + layer).show();
					that.calculate(layer);
					//console.log(layer, that.scrollTop);

					$(window).on("resize.layer", function(){
						that.calculate(layer);
					});
				}

				e.preventDefault();
			});
        },
        
        /**
         * @param {string} target 이벤트 대상 식별자
         * @param {string} dimmed 레이어 딤
         * @param {string} parent 대상 레이어
         * @param {function} callback 실행에 대한 콜백함수
         */
		close: function(target, dimmed, parent, callback){
			var that = this;
			$(document).on("click", target, function(e){
				var layer;
				var targetDom = $(this);
				if(target == dimmed){
					layer = $(parent);
					//console.log("dimmed");
				}
				else{
					layer = $(parent + "."+$(this).data("layer"));
				}
				
				if(callback){
					callback(hide, layer, targetDom);
				}
				else{
					hide();
				}

				function hide() {
					layer.hide();
					$("body").removeClass("fixed");
					$(window).scrollTop(that.scrollTop);
					if(dimmed) $(dimmed).fadeOut();
					//console.log(layer, that.scrollTop);

					$(window).off("resize.layer");
				}

				e.preventDefault();
			});
		},
    },

    Map: {
		init: function(){
			var JqMap = function(){
				this.map = new Object();
			};
			JqMap.prototype = {
				/* key, value 값으로 구성된 데이터를 추가 */
				put: function (key, value) {
					this.map[key] = value;
				},
				/* 지정한 key값의 value값 반환 */
				get: function (key) {
					return this.map[key];
				},
				/* 구성된 key 값 존재여부 반환 */
				containsKey: function (key) {
					return key in this.map;
				},
				/* 구성된 value 값 존재여부 반환 */
				containsValue: function (value) {
					for (var prop in this.map) {
						if (this.map[prop] == value) {
							return true;
						}
					}
					return false;
				},
				/* 구성된 데이터 초기화 */
				clear: function () {
					for (var prop in this.map) {
						delete this.map[prop];
					}
				},
				/*  key에 해당하는 데이터 삭제 */
				remove: function (key) {
					delete this.map[key];
				},
				/* 배열로 key 반환 */
				keys: function () {
					var arKey = new Array();
					for (var prop in this.map) {
						arKey.push(prop);
					}
					return arKey;
				},
				/* 배열로 value 반환 */
				values: function () {
					var arVal = new Array();
					for (var prop in this.map) {
						arVal.push(this.map[prop]);
					}
					return arVal;
				},
				/* Map에 구성된 개수 반환 */
				size: function () {
					var count = 0;
					for (var prop in this.map) {
						count++;
					}
					return count;
				}
			};

			return new JqMap();

		}
	},

    event: {

        /**
         * @param {string} target 이벤트 대상 객체
         * @param {string} active 엑티브 명칭
         * @param {function} callback 실행에 대한 콜백함수
         */
        toggle: function(target, active, callback){
			$(document).on("click", target, function(e) {
				var targetDiv = $(this);
				var layer = $("." + targetDiv.data("target"));
				var sort = targetDiv.data("sort");
				var onClass = targetDiv.data("on");
				var siblings = targetDiv.data("siblings");
				//console.log(sort, onClass, siblings);

				function logic(){
					
					if(onClass){
						if(siblings){
							targetDiv.parent().siblings().find(target).removeClass(active);
							targetDiv.parent().siblings().find(target).siblings().removeClass(active);
						}
						if(targetDiv.hasClass(active)){
							targetDiv.removeClass(active);
							layer.removeClass(active);
						}
						else{
							targetDiv.addClass(active);
							layer.addClass(active);
						}	
					}
	
					if(layer.is(":visible")){
						if(sort == "fade"){
							layer.fadeOut();
						}
						else if (sort == "normal"){
							layer.hide();
						}
						else if (sort == "none"){
							return false;
						}
						else{
							layer.slideUp();
						}
					}
					else{
						if(sort == "fade"){
							if(siblings){
								targetDiv.parent().siblings().find(target).siblings().fadeOut();
							}
							layer.fadeIn();
						}
						else if (sort == "normal"){
							if(siblings){
								targetDiv.parent().siblings().find(target).siblings().hide();
							}
							layer.show();
						}
						else if (sort == "none"){
							return false;
						}
						else{
							if(siblings){
								targetDiv.parent().siblings().find(target).siblings().slideUp();
							}
							layer.slideDown();
						}
					}

				}

				if(callback) {
					callback(logic, targetDiv, active, layer);
				}
				else{
					logic();
				}
				//e.preventDefault();
				//console.log(1);
			});
        },
        /**
         * @param {string} target 이벤트 대상 객체
         * @param {string} active 엑티브 명칭
         * @param {function} callback 실행에 대한 콜백함수
         */
        taps: function(target, active, callback){
			//console.log(target);
			$(document).on("click", target, function(e){
				var $this = $(this);
				var $layer = $this.parent().parent().next(".tab_cont");
                var idx = $this.index();
                var parent = $this.parent().parent().parent();
                

				function swap(){
					$this.addClass(active).siblings().removeClass(active);
					$layer.find("> div").eq(idx).show().siblings().hide();
				} 
				if(callback){
					callback(swap, target, active, parent);
				}
				else{
					swap();
				}
				e.preventDefault();
			});
        },
        /**
         * @param {string} target 이벤트 대상 객체
         * @param {string} active 엑티브 명칭
         * @param {string} parent 이벤트 래퍼 객체
         */
        tabInit: function(target, active, parent){
            var $target = null;
            if(parent) {
                $target = parent.find(target);
                //console.log(parent, $target);
            }
            else{
                $target = $(target);
            }
            var $layer = $target.parent().parent().next(".tab_cont");

            $target.removeClass(active).eq(0).addClass(active);
            $layer.find(" > div").hide().eq(0).show();
        },


        /**
         * @param {string} target 이벤트 대상 객체
         * @param {string} active 엑티브 명칭
         * @param {string} on 이미지 스왑 on 명칭 ex)_on
         * @param {string} off 이미지 스왑 off 명칭 ex)_off
         */
        swapImg: function(target, active, on, off){
            var $target = $(target);
            $target.each(function(idx, item){
                //console.log(item);
                var img = "",
                    $item = $(item).find("img");

                if($(item).hasClass(active)){
                    img = $item.attr("src").replace(off, on);
                    $item.attr("src", img);
                }
                else{
                    img = $item.attr("src").replace(on, off);
                    $item.attr("src", img);
                }
            });
        },
		calander: function(target, option, callback){
			$(target).each(function(){
				$(this).datepicker(option); 
				//$(this).datepicker("setDate", "today"); 
				$(this).on("change", callback);
			});
        },
        nav: function(ele){
            var _this = this;
            var $target = $(ele);
            var depth1 = $target.find(" > ul > li");
            var depth2 = $target.find(" > ul > li > .item_cont ul > li");
            $(depth1).off().on("mouseenter focusin", function(){
                $(depth1).removeClass("off");
                $(this).addClass("ov").siblings("li").removeClass("ov").addClass("off");
                $(depth1).children("div").hide().children("div").children("ul").stop().animate({"opacity" : "0"});
                $(this).find(" > a").siblings("div").show().children("div").children("ul").stop().animate({"opacity" : "1"});
            });
            $(depth2).off().on("mouseenter focusin", function(){
                $(this).addClass("ov").siblings("li").removeClass("ov");
                $(depth2).children("div").hide().children("div").children("ul").stop().animate({"opacity" : "0"});
                $(this).find(" > a").siblings("div").show().children("div").children("ul").stop().animate({"opacity" : "1"});
            });
            $target.find(" > ul").off().on("mouseleave", function(){
                $(depth1).removeClass("off");
                $(ele + " li").removeClass("ov");
                $(ele + " li > div").hide().children("div").children("ul").stop().animate({"opacity" : "0"});
                $(ele + " > ul > li.active > div, "+ ele + " > ul > li > .item_cont ul > li.active > div").show().children("ul").stop().animate({"opacity" : "1"});
            });
        },
        customSelect:function(parent){
			var target = parent + " button";
			var listTarget = parent + " a";
			var $parent;
			$(document).on("click", target, function(e){
				$parent = $(this).parent();
				if($parent.hasClass("on")){
					$parent.removeClass("on");
				}
				else{
					$(parent).removeClass("on");
                    $parent.addClass("on");
                    QTAS.iscrolls.resize();
				}
				//console.log($parent);
			});
			$(document).on("click", listTarget, function(e){
				var bt = $parent.find("button");
				var input = $parent.find("input");
				var val = $(this).data("val");
				var text = $(this).text();

				input.val(val);
				bt.text(text);
				//console.log(input, input.val());

				$parent.addClass("select");
				$parent.removeClass("on");

				e.preventDefault();
			});
		},
        changeSelect:function(target){
			$(document).on("change", target, function(e){
				var val = $(this).val();
				var target = $(this).parent().find(".selText");
				if (val == "DISP_ROOT") {
					target.html(target.attr("data-name"))
				} else {
					target.html($(this).find(".bestSubCate" + val).attr("data-name"))
				}
				//console.log(val, target);
			});
		},
    },
    iscrolls: {
        cash: null,
        num: 0,
		init: function(target, option){

			this.cash = this.cash ? this.cash : QTAS.Map.init();

            $(target).each(function(idx, item){
                $(target)[idx].iscrolls = new IScroll(item, option);
                //console.log(item);
                this.cash.put(this.num++, {sort: item, option: option});
            }.bind(this));
            //console.log(this.cash);
		},
		resize: function(){
			var that = this;
			if(that.cash){
				$.each(that.cash.map, function(key, value){
                    if(value.sort.className == "select_list"){
                       //console.log(key, value.sort.iscrolls);
                        value.sort.iscrolls.scrollTo(0, 0);                 
                    }
				});
			}
			else{
				return;
			}
		},
	},

    /*지도로직*/
    MapLogic: function($){

        function Map($elm) {
            this.$elm = $elm;
            this.init();
        }

        Map.prototype.init = function(){
            this.$wide = this.$elm.find(".wide_map");
            this.$area = this.$elm.find(".area_map");
            this.$tooltip = this.$elm.find(".tooltip_w");
            this.$nav = this.$elm.find(".map_nav");
            this.$tooldim = this.$elm.find(".tooltip_dim");
            this.targetC = null;
            this.nation = "";

            this.positionM();
            this.event();
        };

        Map.prototype.event = function(){
            /*메인지도 지역 호버*/
            this.$wide.on("mouseenter", "li", this.mapEnter.bind(this));
            this.$nav.on("mouseenter", "li", this.mapEnter.bind(this));
            this.$wide.on("mouseleave", "li", this.mapLeave.bind(this));
            this.$nav.on("mouseleave", "li", this.mapLeave.bind(this));

            /*메인지도 지역 클릭*/
            this.$wide.on("click", "li", this.mapOpen.bind(this));
            this.$nav.on("click", "li", this.mapOpen.bind(this));

            /*지역지도 호버*/
            this.$area.find(".area_in").on("mouseenter", "li", this.areaHover.bind(this));
            /*
            this.$tooltip.on("mouseenter", function(e){
                this.$tooltip.addClass("on");
                this.targetC.addClass("hover");
            }.bind(this));
            this.$area.find(".area_in").on("mouseleave", "li", this.areaLeave.bind(this));
            this.$tooltip.on("mouseleave", this.areaLeave.bind(this));*/

            /*지역지도 닫기 클릭*/
            this.$area.on("click", ".area_close", this.mapClose.bind(this));

            /*튤팁 닫기 클릭*/
            this.$tooltip.on("click", ".tooltip_close", this.areaLeave.bind(this));

        };

        /*이벤트 핸들러*/
        Map.prototype.mapOpen = function(e) {
            this.swap(e ,"on");
            this.closeT();
            this.open();
            this.position();
            return false;
        };
        Map.prototype.mapClose = function(e) {
            this.close();
            return false;
        };
        Map.prototype.mapEnter = function(e) {
            this.swap(e ,"hover");
            return false;
        };
        Map.prototype.mapLeave = function(e) {
            this.$wide.removeClass(this.nation);
            this.$wide.find("li").removeClass("hover");
            this.$nav.find("li").removeClass("hover");
            return false;
        };
        Map.prototype.areaHover = function(e) {
            this.$area.find(".area_in li").removeClass("hover");
            this.$tooltip.find(".tooltip_tit strong").text("");
            this.$tooltip.find(".tooltip_tit span").text("");
            //this.$tooltip.removeClass("on");

            var _target= $(e.target);
            var _targetC = this.targetC =  $(e.currentTarget);
            var x = Number(_targetC.attr("data-x")) + _targetC.height();
            var y = Number(_targetC.attr("data-y")) - (this.$tooltip.width() / 2) + (_targetC.width()/3) + 20;
            y = y > 100 ? 100:y;
            var sort = _targetC.attr("data-p");
            var val = _target.text()
            
            

            //onsole.log(sort, val);

            _targetC.addClass("hover");

            this.$tooltip.find(".tooltip_tit strong").text(val);
            this.$tooltip.find(".tooltip_tit span").text(sort);
            this.$tooltip.css({
                top: x,
                left: y,
            });

            this.$tooltip.addClass("on");

            return false;
        };
        Map.prototype.areaLeave = function(e) {
            //console.log(e.target);
            this.$tooldim.show();
            setTimeout(function() {
                this.$tooldim.hide();
            }.bind(this), 300);
            this.closeT();
        };


        /*동작*/
        Map.prototype.swap = function(e, active){
            //console.log($(e.currentTarget));
            this.$wide.removeClass(this.nation);

            this.nation = $(e.currentTarget).attr("data-nation");
            this.$wide.find("li").removeClass(active);
            this.$nav.find("li").removeClass(active);

            this.$wide.find("li[data-nation='"+ this.nation +"']").addClass(active);
            this.$nav.find("li[data-nation='"+ this.nation +"']").addClass(active);
            this.$wide.addClass(this.nation);

            //console.log(nation);
        };

        Map.prototype.open = function(){
            this.$wide.hide();

            this.$area.find(".area_list > ul > li").removeClass("act");
            this.$area.show();
            this.$area.find("."+ this.nation).addClass("act");
            
        };

        Map.prototype.close = function(){
            this.closeT();
            this.$area.hide();
            this.$area.find(".area_list > ul > li").removeClass("act");
            this.$area.find(".area_in li").removeClass("act");
            this.$wide.find("li").removeClass("on");
            this.$nav.find("li").removeClass("on");
            this.$wide.show();
            this.positionM();
        };
        Map.prototype.closeT = function(){
            this.$area.find(".area_in li").removeClass("hover");
            this.$tooltip.removeClass("on");
        };

        Map.prototype.positionM = function(){
            this.$wide.find("li").removeClass("act");
            this.$wide.find("li").each(function(idx, item){
                var _this = $(item);
                setTimeout(function(){
                    _this.addClass("act");
                 },600 + ( idx * 200 ));
              //console.log(x, y);
            });
            
        }

        Map.prototype.position = function(){
            this.$area.find(".area_in li").removeClass("act");
            this.$area.find("."+ this.nation).find(".area_in li").each(function(idx, item){
                var _this = $(item);
                var x = _this.attr("data-x");
                var y = _this.attr("data-y");

                _this.css({
                    top: Number(x),
                    left: Number(y),
                });

                setTimeout(function(){
                    _this.addClass("act");
                 },300 + ( idx * 100 ));
                

                //console.log(x, y);
            });
            
        };

        return Map;
    },
};

$(function(){

    var LAYER_DIM = ".layer_dimmed",
		LAYER_DIV = ".pop_layer";

    if($(".MapVoc").length){
        var voc = new (QTAS.MapLogic(jQuery))($(".MapVoc"));
        console.log(voc);
    }


    QTAS.event.nav(".nav_wrap");
    QTAS.event.changeSelect(".sort_select select");

    if($(".pop_layer.layer-t01").length) {
        QTAS.layer.open(".header .log_wrap .admin", LAYER_DIM, LAYER_DIV, function (show){
            //alert("콜백");
            
            $(".header .log_wrap .admin").addClass("active");
    
            show();
        });
    }

    
	QTAS.layer.close(".layer_close", LAYER_DIM, LAYER_DIV, function (hide){
        //alert("콜백");
        
        $(".header .log_wrap .admin").removeClass("active");

		hide();
    });
    

    QTAS.layer.close(LAYER_DIM, LAYER_DIM, LAYER_DIV, function (hide){
        //alert("콜백");
        
        $(".header .log_wrap .admin").removeClass("active");

		hide();
    });

    QTAS.event.calander(".datepicker", {
		dateFormat: 'yy-mm-dd',
        showMonthAfterYear: true,
        changeYear: false,
        changeMonth: false,
        showOn: "both",
        buttonText: "날짜선택",
        yearSuffix: '.',
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	},
	function(e){
		console.log("날짜변경됨");
    });

    if($(".btn_toggle").length) {
        QTAS.event.toggle(".btn_toggle", "active", function(logic, targetDiv, active){
            if(targetDiv.hasClass(active)){
                targetDiv.text("내용접기");
            }
            else{
                targetDiv.text("내용펼치기");
            }
            logic();
        });
    }

    QTAS.event.customSelect(".select_custum");

    $(".form_file").on("change", ".btn_file input", function(){
        var $target = $(this),
            fileName = $target.val(),
            text = $target.parent().find(".text");

        text.find("> div").text(fileName);
        text.find("button").show();
    });
    $(".form_file").on("click", ".btn_file .text button", function(){
        var $target = $(this),
            parent = $target.parent().parent();

        parent.find(".text > div").text("");
        parent.find("input").val("");
        $target.hide();
        
    });
    

});

$(window).on("load", function(){

	/*아이스크롤*/
	if($(".select_custum .select_list").length){
		QTAS.iscrolls.init(".select_custum .select_list", { 
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            hScroll:false
		});	
    }
    if($(".table_list.fixed").length){
		QTAS.iscrolls.init(".table_list.fixed", { 
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
            fadeScrollbars: false,
            scrollX:true,
            scrollY:false,
		});	
	}
	
});