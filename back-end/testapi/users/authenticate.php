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

// instantiate contact object
$contact = new User($db, "users");

// get username and password
$name=isset($_GET["n"]) ? $_GET["n"] : "";
$password=isset($_GET["p"]) ? $_GET["p"] : "";

// query users table to see if username/password exists in database
$stmt = $contact->authenticate($name, $password);
$num = $stmt->rowCount();

// check if EXACTLY one record is found. No duplicates are allowed
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
