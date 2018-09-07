var urlBase = 'http://localhost/COP4331-Small-Project/back-end/testapi';
var extension = "php";


function doCreate()
{
	var username = document.getElementById("CreateName").value;
	var password = document.getElementById("CreatePassword").value;
	var checkPass = document.getElementById("checkPass").value;
	document.getElementById("CreateResult").innerHTML = "";
	console.log(password);
	console.log(checkPass);

	if(password != checkPass)
		{
			document.getElementById("CreateResult").innerHTML = "Passwords do not match";
			return;
		}


	var jsonPayload = '{"create" : "' + username + '", "password" : "' + password + '"}';
	console.log(jsonPayload);
	var url = urlBase + '/users/create.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
	xhr.send(jsonPayload);
	console.log(xhr.responseText);
	var jsonObject = JSON.parse( xhr.responseText );
	console.log(jsonObject);
	if(jsonObject.message == "User was created.")
		document.getElementById("CreateResult").className = "text-success";
	else
		document.getElementById("CreateResult").className = "text-danger";
	document.getElementById("CreateResult").innerHTML = jsonObject.message;
	}
	// 	// userId = jsonObject.id;
		
	// 	// if( userId < 1 )
	// 	// {
	// 	if(jsonObject.message == "Successful Login!")
	// 	{
	// 		document.getElementById("loginResult").className = "text-success";
	// 		window.location.href="contact.html";
	// 	}
	// 	else
	// 		document.getElementById("loginResult").className = "text-danger";
	// 	document.getElementById("loginResult").innerHTML = jsonObject.message;
	catch(err)
	{
		document.getElementById("CreateResult").innerHTML = err.message;
	}
		}