<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/database.php';
include_once '../objects/contacts.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare contact object
$contact = new Contact($db, "contacts");

// get contact id (uneccesary if using $keywords on line 28)
//$data = json_decode(file_get_contents("php://input"));

// set contact id to be deleted (uneccesary if using $keywords on line 28)
//$contact->name = $data->name;

// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";

// delete the contact
if($contact->delete($keywords)){
    echo json_encode(
        array("message" => "Contact was deleted.")
    );
}

// if unable to delete the contact
else{
    echo json_encode(
        array("message" => "Unable to delete object.")
    );
}
?>
