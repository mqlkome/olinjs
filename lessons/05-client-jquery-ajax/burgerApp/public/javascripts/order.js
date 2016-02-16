var $orderForm = $("#ajax-order-form");
var orderTotal = 0;

var onSuccessOrder = function(data, status) {
  	var $thanksMessage = $("#thanksMessage")
  	$thanksMessage.css('display', 'block')
};


var onErrorOrder = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$orderForm.on('change', ':checkbox', function(){
	if ($(this).is(':checked')) {
        $('#total').text(orderTotal += parseFloat($(this).attr("cost")));
    } else {
        $('#total').text(orderTotal -= parseFloat($(this).attr("cost")));
    }
});

$orderForm.submit(function(event){
	event.preventDefault();
	var choices = [];
	$("input:checked").each(function(){
		choices.push($(this).val())
	});
	var name = $orderForm.find("[name='customerName']").val();
	var orderData = {name: name, choices: choices}
	$.post("submitOrder", orderData)
	.done(onSuccessOrder)
	.error(onErrorOrder)

});


