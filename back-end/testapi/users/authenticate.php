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

// initialize object
$contact = new User($db, "users");

// get name
$name=isset($_GET["n"]) ? $_GET["n"] : "";
$password=isset($_GET["p"]) ? $_GET["p"] : "";

// query contacts
$stmt = $contact->authenticate($name, $password);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num == 1){
  echo json_encode(
      array("message" => "Successful Login!")
  );
}

else{
    echo json_encode(
        array("message" => "Username/Password combination not valid. Please try again.")
    );
}
?>
