var username;

$( document ).ready(function() {
    username = getUsername();
    $("#Username").html(username);
    //console.log( "document loaded! checking for username cookie." );
    if (username == undefined) {
        //console.log("username is undefined");
        //TODO: Uncomment this in final version
        //alert("User is not logged in! You will now be redirected to login.");
        //window.location.href="index.html";
    }
    $("#searchbox").val("");
    
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
        function(result){search();});
    
    
    $("#name").val("");
    $("#phone").val("");
    $("#address").val("");
}

function getUsername() {
    return Cookies.get("username");
}

function open()
{
    console.log("hello");
}

function search()
{
    //console.log("search clicked: " + $("#searchbox").val());
    var json = "{ \"username\":\"" + username + "\", \"keyword\":\"" + $("#searchbox").val() +  "\" }";
    
    //alert(json);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/search.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        //console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
        var i;

        var contactTable = $("#contactTable").empty();
        for(i=0; i<jsonObject.records.length; i++)
        {

            appendText(jsonObject.records[i].name, jsonObject.records[i].id);
           // console.log(jsonObject.records[i].name);
        }
    }
    catch (err)
    {
        alert(err);
    }

    // $.post(
    //     "/COP4331-Small-Project/back-end/testapi/contact/search.php",
    //     json,
    //     function(result){   console.log(result);  });
    
} 

function appendText(name, id)
{

    var text = "<tr id=\"" + id + "\" onClick=\"open();\"> <td>" + name + 
        "<button class=\"btn btn-outline-secondary float-right\" onClick=\"del();\" type=\"button\"><span class=\"fa fa-trash\"></span></button></td></tr>";
//<tr id="7"><td>Name</td></tr>
    //console.log(text);
    var contactTable = $("#contactTable");
    contactTable.append(text);

    //contactTable.empty();
}


function del()
{
    var id = $(event.target).parent().attr("id");
    console.log(id);
    console.log(event.target);
    //set to server to delete this id
    var json = "{ \"username\":\"" + username + "\", \"id\":" + id +  " }";
    console.log(json);
    // post resquest - id and user name
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/delete.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    // var json = "{ \"name\":\"" + username + "\", \"id\":" + id +  " }";
    //alert(json);
    try
    {
        xhr.send(json);
        console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
        //console.log(jsonObject);
    }
    catch (err)
    {
        alert(err);
    }

    $(event.target).parent().parent().remove();
} 


