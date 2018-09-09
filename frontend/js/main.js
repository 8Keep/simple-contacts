var username;

$( document ).ready(function() {
    username = getUsername();
    $("#Username").html(username);
    if (username == undefined) {
        //console.log("username is undefined");
        //TODO: Uncomment this in final version
        //alert("User is not logged in! You will now be redirected to login.");
        //window.location.href="index.html";
    }
    $("#searchbox").val("");
    
    //for testing:
    appendText("davis r", "6");
    appendText("the dude lewbowski", "7");
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

function display(event)
{
    event.stopPropagation();
    var id = $(event.target).parent().parent().attr("id");
    console.log(id);
}

function search()
{
    var json = "{ \"username\":\"" + username + "\", \"keyword\":\"" + $("#searchbox").val() +  "\" }";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/search.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        var jsonObject = JSON.parse( xhr.responseText );
        var i;
        var contactTable = $("#contactTable").empty();
        for(i=0; i<jsonObject.records.length; i++)
        {
            
            appendText(jsonObject.records[i].name, jsonObject.records[i].id);
        }
    }
    catch (err)
    {
        //alert(err);
    }
}

function del(event)
{
    event.stopPropagation();
    var id = $(event.target).parent().parent().attr("id");
    console.log(id);
    console.log(event.target);
    var json = "{ \"username\":\"" + username + "\", \"id\":" + id +  " }";
    console.log(json);
    // post resquest - id and user name
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/delete.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
    }
    catch (err)
    {
        alert(err);
    }

    $(event.target).parent().parent().remove();
} 


function appendText(name, id)
{
    //TODO: fix the table click to be able to open a contact
    //onClick=\"open(event);\"
    var text = "<tr id=\"" + id + "\" > <td>" + name + 
        "<button class=\"btn btn-outline-secondary float-right fa fa-trash\" onClick=\"del(event);\" onmouseover=\"display(event);\" type=\"button\"></button></td></tr>";
    console.log(text);
    var contactTable = $("#contactTable");//.append("<tr ").attr(".html("<span class=\"fa fa-trash\"></span>")
    contactTable.append(text);
}
