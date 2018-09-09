var urlBase = 'http://localhost/COP4331-Small-Project/back-end/testapi';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	console.log(login);
	console.log(password);
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	console.log(jsonPayload);
	var url = urlBase + '/users/authenticate.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);
		console.log(xhr.responseText);
		var jsonObject = JSON.parse( xhr.responseText );
		console.log(jsonObject);

		if(jsonObject.message == "Successful Login!")
		{
            Cookies.set("username", login);
			document.getElementById("loginResult").className = "text-success";
			window.location.href="contact.html";
		}
		else
			document.getElementById("loginResult").className = "text-danger";
		document.getElementById("loginResult").innerHTML = jsonObject.message;

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

$( document ).ready(function() {
    $("#loginPassword").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#login").click();
        }
    });
});
              
