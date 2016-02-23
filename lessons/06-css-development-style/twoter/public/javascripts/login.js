var $logInForm = $("#ajax-logIn-form");
console.log("login.js loaded")
var onSuccess = function(data, status){
	window.location.href = "/"
};

var onError = function(data, status){
	console.log("status", status);
	console.log("error", data);
};

$logInForm.submit(function(event){
	event.preventDefault();
	var user = $logInForm.find("[name = 'username']").val()
	$.post("logIn", {
		username: user,
	})
	.done(onSuccess)
	.error(onError)
});