var username;

$( document ).ready(function() {
    username = getUsername();
    $("#Username").html(username);
    console.log( "document loaded! checking for username cookie." );
    if (username == undefined) {
        //console.log("username is undefined");
        //TODO: Uncomment this in final version
        //alert("User is not logged in! You will now be redirected to login.");
        //window.location.href="index.html";
    }
    $("#searchbox").val("");
    appendText("bao", 1);
    search();
});

function add() {
    var contact = { name: $("#name").val(),
                    phone: $("#phone").val(),
                    address: $("#address").val(),
                    username: username };
    $.post(
        "/COP4331-Small-Project/back-end/testapi/contact/create.php",
        JSON.stringify(contact),
        function(result){console.log(result);});
    
    
    $("#name").val("");
    $("#phone").val("");
    $("#address").val("");
}

function getUsername() {
    return Cookies.get("username");
}

function search()
{
    //console.log("search clicked: " + $("#searchbox").val());
    var json = "{ \"username\":\"" + username + "\", \"keyword\":\"" + $("#searchbox").val() +  "\" }";
    
    alert(json);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/search.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
        console.log(jsonObject);
    }
    catch (err)
    {
        console.log(err);
    }

    // $.post(
    //     "/COP4331-Small-Project/back-end/testapi/contact/search.php",
    //     json,
    //     function(result){   console.log(result);  });
    
} 

function appendText(name, id)
{

    var text = "<tr id=\"" + id + "\"> <td>" + name + 
        "<button class=\"btn btn-outline-secondary float-right\" onClick=\"delete();\" type=\"button\"><span class=\"fa fa-trash\"></span></button></td></tr>";
//<tr id="7"><td>Name</td></tr>
    console.log(text);
    var contactTable = $("#contactTable");
    contactTable.append(text);

    //contactTable.empty();
}


function del()
{
    var id = $(event.target).parent().parent().attr("id");
    //set to server to delete this id

    // post resquest - id and user name
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/delete.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
        console.log(jsonObject);
    }
    catch (err)
    {
        console.log(err);
    }

    $(event.target).parent().parent().remove();
} 


