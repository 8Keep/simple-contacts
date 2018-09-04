<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate contact object
include_once '../objects/contacts.php';

$database = new Database();
$db = $database->getConnection();

$contact = new Contact($db, 'contacts');

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";

// set contact property values
//$contact->name = $data->name;
$contact->name = $keywords;

// create the contact
if($contact->create($keywords)){
    echo '{';
        echo '"message": "contact was created."';
    echo '}';
}

// if unable to create the contact, tell the user
else{
    echo '{';
        echo '"message": "Unable to create contact."';
    echo '}';
}
?>
