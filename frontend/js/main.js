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
    $(".ContactContents").css("visibility","hidden");
    $("#searchbox").val("");
    
    //for testing:
    appendText("davis r", "6");
    appendText("the dude lewbowski", "7");
    search();
});

function add(event) {
    if($("#name").val() == "" && $("#phone").val() == "" && $("#address").val() == "")
    {
        $("#adderr").html("Require at least one information");
        $(event.target).attr("data-dismiss", "");
        return;
    }
    $(event.target).attr("data-dismiss", "modal");
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

//DISPLAY CONTACT INFO 
function display(event)
{
    event.stopPropagation();
    
    
    var id = $(event.target).parent().attr("id");
    var json = "{ \"id\":\"" + id + "\"}";
    var IDattr = "t" +id;
    //checking if the name was clicked or not
    if($(".ContactContents").attr('id') != IDattr)
    {
        $(".ContactContents").attr('id', IDattr);
        $("#" + IDattr).css("visibility", "hidden");
    }
    else
    {
        $(".ContactContents").attr('id', IDattr);
    }
    
    console.log($(".ContactContents").attr('id'));
    console.log($("#" + IDattr).attr('style'));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/display.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    //display toggle
    if($("#" + IDattr).css("visibility") == "hidden")
        $("#" + IDattr).css("visibility","visible");
    
    else
        $("#" + IDattr).css("visibility", "hidden");

    try
    {
        xhr.send(json);
        //console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
        //console.log(jsonObject);

        var name = jsonObject.records[0].name;
        var phone = jsonObject.records[0].phone;
        var address = jsonObject.records[0].address;
        $("#contactname").html(name);
        $("#contactphone").html(phone);
        $("#contactaddress").html(address);

        
    
    }
    catch (err)
    {
        //alert(err);
    }
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
    //console.log(id);
    console.log(event.target);
    var json = "{ \"username\":\"" + username + "\", \"id\":" + id +  " }";
    //console.log(json);
    // post resquest - id and user name
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/COP4331-Small-Project/back-end/testapi/contact/delete.php", false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(json);
        //console.log(xhr.responseText);
        var jsonObject = JSON.parse( xhr.responseText );
    }
    catch (err)
    {
        //alert(err);
    }

    //delete will also get rid of the table but does not affect tables of undelte objects
    $(event.target).parent().parent().remove();
    if($(".ContactContents").attr('id') == ("t" + id))
        $(".ContactContents").css("visibility","hidden");
    else
    {

    }
} 


function appendText(name, id)
{
    //TODO: fix the table click to be able to open a contact
    //onClick=\"open(event);\"
    var text = "<tr id=\"" + id + "\" > <td onClick=\"display(event);\">" + name + 
        "<button class=\"btn btn-outline-secondary float-right fa fa-trash\" onClick=\"del(event);\" type=\"button\"></button></td></tr>";
    //console.log(text);
    var contactTable = $("#contactTable");//.append("<tr ").attr(".html("<span class=\"fa fa-trash\"></span>")
    contactTable.append(text);
}
$( document ).ready(function() {
    $("#searchbox").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#searchClick").click();
        }
    });
});
      