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
include_once '../objects/users.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db, 'contacts');

// get posted data
$data = json_decode(file_get_contents("php://input"));
echo $data;
// get username/password
$name=isset($_GET["n"]) ? $_GET["n"] : "";
$password=isset($_GET["p"]) ? $_GET["p"] : "";

// set contact property values
//$contact->name = $data->name;
$user->name = $name;

// create the contact
if($user->create($name, $password)){
    echo '{';
        echo '"message": "User was created."';
    echo '}';
}

// if unable to create the contact, tell the user
else{
    echo '{';
        echo '"message": "Unable to create user."';
    echo '}';
}
?>
