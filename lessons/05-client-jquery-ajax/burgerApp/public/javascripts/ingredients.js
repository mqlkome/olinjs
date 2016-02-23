var $ingrForm = $("#ajax-ingr-form");
var $templateLi = $("#hidden-template-li");
var $ingrList = $("#ingrList");
var $editForm;
var $oosButton;

bindHandlers();

var onSuccess = function(data, status) {
  	var $newLi = $templateLi.clone();
  	$newLi.attr('id', data._id);
  	$newLi.css('display', 'block');
  	$newLi.find('.name').html(data.name);
  	$newLi.find('.cost').html(data.cost);  
  	$ingrList.append($newLi);	
  	bindHandlers();
};

var onSuccessEdit = function(data, status){
	$("#" + data.id).find("[class = 'name']").html(data.name);
	$("#" + data.id).find("[class = 'cost']").html(data.cost);
};

var onSuccessOos = function(data, status){
	$("#" + data.id).remove();
	bindHandlers();
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$ingrForm.submit(function(event) {
  event.preventDefault();
  var name = $ingrForm.find("[name='name']").val();
  var cost = $ingrForm.find("[name='cost']").val();
  $.post("addIngredient", {
    name: name,
    cost: cost
  })
    .done(onSuccess)
    .error(onError);
});

function bindHandlers() {
	$editForm = $(".ajax-ingr-edit-form");
	$oosButton = $(".oosButton")

	$editForm.submit(function(event){
		event.preventDefault();
		var name = $(this).find("[name='name']").val();
	  	var cost = $(this).find("[name='cost']").val();
	  	var id = this.parentElement.id
	  	var editedIngredient = {name: name, cost: cost, id: id}
	  	if (name.length && cost.length){
		  	$.post("editIngredient", editedIngredient)
		    .done(onSuccessEdit)
		    .error(onError);
		} else{alert("Name and/or cost field empty, did not edit")}
	});
	$oosButton.click(function(event){
		event.preventDefault();
		var id = this.parentElement.id
		$.post("oosIngredient", {id: id})
		.done(onSuccessOos)
		.error(onError)
	});
}