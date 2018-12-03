console.log("ok!");
$(document).ready(function() {
	$('li').each(function(index){
		// alert("li_"+index);
		$(this).click(function(event) {
			// alert("li_"+index);
			$('#photoDetails').show();
		});
	});
	$('.close').click(function(event) {
		$('#photoDetails').hide();
	});
});