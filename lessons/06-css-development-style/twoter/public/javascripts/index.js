var $twoteForm = $("#ajax-twote-form");
var $templateLi = $("#hidden-template-li");
var $twoteList = $("#twoteList");
var $eraseTwoteButton = $(".eraseTwoteButton");
var $userListEntry = $("#userList li")

var onSuccessIndex = function(data, status){
        //Nice
	var $newLi = $templateLi.clone()
	$newLi.attr('id', data._id);
  	$newLi.css('display', 'block');
  	$newLi.find('.user').html(data.username);
  	$newLi.find('.twote').html(data.twote);
  	$twoteList.prepend($newLi);
        // You are going to have to rebind your on click handler here. That is why you can't delete new twotes
};

var onSuccessErase = function(data, status){
	if (data.noDeleting){
		alert("That twote isn't yours! Please do not delete other users' thoughts");
	}else{
		$("#" + data.id).remove();
	}
};

var onErrorIndex = function(data, status){
	console.log("status", status);
	console.log("error", data);
};

$twoteForm.submit(function(event){
	event.preventDefault();
	var twote = $twoteForm.find("[name = 'twote']").val()
	$.post("addTwote", {
		twote: twote
	})
	.done(onSuccessIndex)
	.error(onErrorIndex)
});


$eraseTwoteButton.click(function(event){
	event.preventDefault();
	var id = this.parentElement.id;
	var user = $("#" + id).find(".user").val(); //.user means [class = user] because . is shortcut for class
	$.post("eraseTwote", {id:id, user: user}) 
	.done(onSuccessErase) 
	.error(onErrorIndex)
});

$userListEntry.click(function(event){
	$('.highlighted').toggleClass('highlighted not-highlighted')
	$('.'+ this.className + '.not-highlighted').toggleClass('highlighted not-highlighted')
})
