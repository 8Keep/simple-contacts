var urlBase = 'http://localhost/backend';
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
		
		// userId = jsonObject.id;
		
		// if( userId < 1 )
		// {
		// 	document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
		// 	return;
		// }
		
		// firstName = jsonObject.firstName;
		// lastName = jsonObject.lastName;

		// document.getElementById("userName").innerHTML = firstName + " " + lastName;
		
		// document.getElementById("loginName").value = "";
		// document.getElementById("loginPassword").value = "";
		
		// hideOrShow( "loggedInDiv", true);
		// hideOrShow( "accessUIDiv", true);
		// hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}
