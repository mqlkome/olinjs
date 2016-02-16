// var $kitchenForm = $("#ajax-kitchen-form");
var $completedButton = $(".completedButton")

var onSuccessCompleted = function(data, status){
	$("#" + data.id).remove();
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$completedButton.click(function(event){
	event.preventDefault();
	var id = this.parentElement.id
	$.post("finishOrder", {id: id})
	.done(onSuccessCompleted)
	.error(onError)
});