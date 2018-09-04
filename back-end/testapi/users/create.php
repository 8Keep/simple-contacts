<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object file
include_once '../config/database.php';
include_once '../objects/users.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// get posted data (uneccesary when using $name/$password on line 24/25)
//$data = json_decode(file_get_contents("php://input"));

// get username/password
$name=isset($_GET["n"]) ? $_GET["n"] : "";
$password=isset($_GET["p"]) ? $_GET["p"] : "";

// set contact property values
//$contact->name = $data->name; (uneccesary when using $name/$password on line 24/25)
$user->name = $name;
$user->password = $password;

// create the contact
if($user->create($name, $password)){
    echo json_encode(
        array("message" => "User was created.")
    );
}

// if unable to create the contact, tell the user
else{
    echo json_encode(
        array("message" => "Unable to create user.")
    );
}
?>
