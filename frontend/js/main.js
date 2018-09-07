
function add() {
    var contact = { name: $("#name").val(),
                    phone: $("#phone").val(),
                    address: $("#address").val() };
    
    alert(JSON.stringify(contact));
    
    $.post("/COP4331-Small-Project-master/back-end/testapi/contact/create.php", JSON.stringify(contact), function(result){
        alert(result);
        });
    
    $("#name").val("");
    $("#phone").val("");
    $("#address").val("");
}

function getUsername() {
    return $.cookie("username");
}

function appendText(name, id)
{
    var text = "<tr id\"" + id + "\" <td>" + name + "</td></tr>";
//        <tr id="7"><td>Name</td></tr>
    var contactTable = $("#contactTable");
    contactTable.append(text);
}

