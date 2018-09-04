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
$contact = new Contact($db, 'contacts');

// get posted data (unnecessary if using $keywords on line 24)
//$data = json_decode(file_get_contents("php://input"));

// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";

// set contact property values
//$contact->name = $data->name;
$contact->name = $keywords;

// create the contact
if($contact->create($keywords)){
    echo json_encode(
        array("message" => "Contact was created.")
    );
}

// if unable to create the contact, tell the user
else{
    echo json_encode(
        array("message" => "Unable to create contact.")
    );
}
?>
