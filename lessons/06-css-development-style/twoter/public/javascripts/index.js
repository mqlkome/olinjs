var $twoteForm = $("#ajax-twote-form");
var $templateLi = $("#hidden-template-li");
var $twoteList = $("#twoteList");

var onSuccess = function(data, status){
	console.log("onSuccess twote data:")
	console.log(data);
	var $newLi = $templateLi.clone()
	$newLi.attr('id', data._id);
  	$newLi.css('display', 'block');
  	$newLi.find('.user').html(data.user);
  	$newLi.find('.twote').html(data.twote);
  	$twoteList.prepend($newLi);
};

var onError = function(data, status){
	console.log("status", status);
	console.log("error", data);
};

$twoteForm.submit(function(event){
	event.preventDefault();
	var twote = $twoteForm.find("[name = 'twote']").val()
	$.post("addTwote", {
		twote: twote
	})
	.done(onSuccess)
	.error(onError)
});