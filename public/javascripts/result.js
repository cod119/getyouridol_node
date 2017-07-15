$(document).ready(function() {
    
//result.html
	//$('.box-card').on('click', function(e) {
	//	$(this).hide('fast', function(){
	//		$(this).closest('.box-outter').children('.box-inner').fadeToggle('fast');
	//	});
		
	//});
	//$('.box-inner').on('click', function(e) {
	//	$(this).closest('.box-inner').hide('fast', function() {
	//		$(this).closest('.box-outter').children('.box-card').fadeToggle('fast');
	//	});
	//	
	//});
	
	//만약 아무런 result값이 없다면 nothing 출력
	if ($('.result-wrapper .box-outter').length === 0) {
		$('#result_nothing').show();
	}
	
	//정의된 resizeContent 펑션을 실행
	//params로 전달된 element의 세로 크기를 가로크기와 동일하게 조정함.
	resizeContent(".idol_picture");
	//window를 리사이징 할때, 위의 코드를 실행하여 다시 조정
	$(window).on('resize', function() {
		resizeContent(".idol_picture");
	});
	
	// 위 코드에서 이미지 리사이징을 마신 후 , 로딩 화면을 fadeout시킨 후, .box-outter을 보이게 함
	$('.nowloading').fadeOut('fast',function() {
		//$('.box-outter').css({'opacity':1})
		$('.box-outter').toggleClass("opacityone")
	})

	// .idol_picture을 click할 경우, 
	$('.idol_picture').on('click', function(e) {
		//$(this).css({'width':'30%'})
		$(this).toggleClass("width_thirty_percent")
		var $contWidth = $(this).width();
		$(this).css({'height': $contWidth+'px'})
		$(this).closest('.box-outter').find('.box-inner').slideToggle('fast');
	
			
	});
	
});


//여기부터 .ready 바깥

//함수: 이미지 리사이징: 가로의 길이를 읽어서 세로 길이에 반영.
function resizeContent(element) {
	$(element).each(function() {
		var $contWidth = $(this).width();
		$(this).css({'height': $contWidth+'px'});
		
	})
	
}