$(function()
{
 	DateSet(); 	
});


function DateSet(){
	

	$('.date').datepicker(
			{
				showOtherMonths : true,
				selectOtherMonths : true,
				changeMonth : true,
				showOn : "button",
				buttonImage: "/image/board/btn_calendar.gif",
				buttonImageOnly : true,
				changeYear : true,
				dateFormat : 'yy-mm-dd',
				dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
				monthNamesShort : [ '1월 ', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ]
    });

    $('.date').attr("readonly",true);


}



