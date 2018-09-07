$(document).ready(function(){
    getAllContacts();
}

function add() {
    var contact = { name: $("#name").val(),
                    phone: $("#phone").val(),
                    address: $("#address").val() };
    
    alert(JSON.stringify(contact));
    
    $.post("/add.php", JSON.stringify(contact), function(result){
        alert(result);
        });
    
    $("#name").val("");
    $("#phone").val("");
    $("#address").val("");
}

function getUsername() {
    return $.cookie("username");
}
/*
function getAllContacts() {
    $.getJSON("/search.php"
}

function search()
{
    var srch = document.getElementById("searchbox").value;
    document.getElementById("colorSearchResult").innerHTML = "";
    
    var colorList = document.getElementById("colorList");
    colorList.innerHTML = "";
    
    var jsonPayload = '{"search" : "' + srch + '"}';
    var url = urlBase + '/SearchColors.' + extension;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                hideOrShow( "colorList", true );
                
                document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
                var jsonObject = JSON.parse( xhr.responseText );
                
                var i;
                for( i=0; i<jsonObject.results.length; i++ )
                {
                    var opt = document.createElement("option");
                    opt.text = jsonObject.results[i];
                    opt.value = "";
                    colorList.options.add(opt);
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("colorSearchResult").innerHTML = err.message;
    }
    
}*/
