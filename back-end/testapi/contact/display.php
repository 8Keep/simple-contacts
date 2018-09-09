<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/contacts.php';

// instantiate database and contact object
$database = new Database();
$db = $database->getConnection();
$contact = new Contact($db);

$data = json_decode(file_get_contents("php://input", true));
$id = $data->id;

$stmt = $contact->display($id);

$contacts_arr=array();
$contacts_arr["records"]=array();

// retrieve our table contents
// fetch() is faster than fetchAll()
// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract($row);

    $contact_item=array(
        "id" => $id,
        "name" => $name,
        "phone" => $phonenumber,
        "address" => $address,
    );

    array_push($contacts_arr["records"], $contact_item);
}

echo json_encode($contacts_arr);

?>